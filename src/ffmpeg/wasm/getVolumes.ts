import { createFFmpeg, fetchFile, LogCallback } from '@ffmpeg/ffmpeg';
import { GetVolumesProps } from '..';
import { timecodeToSeconds } from '../../tools/math';

const getVolumes = async ({
	input,
	progress,
}: GetVolumesProps): Promise<number[]> => {
	let duration = 0;
	const volumes: number[] = [];

	const durationRegex = /(?<=Duration: *)\d+:\d+:\d+.\d+/g;
	const dbRegex = /(?<=M: *)-?\d+(\.\d+)?/g;
	const timeRegex = /(?<=t: *)-?\d+(\.\d+)?/g;
	const logger: LogCallback = ({ message }) => {
		console.log(`ffmpeg: ${message}`);

		const durationString = message?.match(durationRegex)?.[0];
		const volumeString = message?.match(dbRegex)?.[0];
		const timeString = message?.match(timeRegex)?.[0];

		if (durationString) {
			duration = timecodeToSeconds(durationString);
		}
		const volume = volumeString ? parseFloat(volumeString) : null;
		const time = timeString ? parseFloat(timeString) : null;
		if (volume !== null && time !== null) {
			console.log(
				`time: ${time.toFixed(2)}s, volume: ${volume.toFixed(2)}dB`,
			);

			progress?.(time / duration, time, duration);

			volumes.push(volume);
		}
	};

	const ffmpeg = createFFmpeg({
		log: false,
	});

	ffmpeg.setLogger(logger);

	await ffmpeg.load();

	const args = ['-i', input, '-filter_complex', 'ebur128', '-f', 'null', '-'];

	const inputBuffer = await fetchFile(input);
	ffmpeg.FS('writeFile', input, inputBuffer);

	await ffmpeg.run(...args);

	await ffmpeg.exit();

	return volumes;
};

export default getVolumes;

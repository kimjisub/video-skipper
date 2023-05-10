import { spawn } from 'child_process';
import { timecodeToSeconds } from '../../tools/math';
import { GetVolumesProps } from '..';

const getVolumes = ({ input, progress }: GetVolumesProps) => {
	let duration = 0;
	const volumes: number[] = [];

	const durationRegex = /(?<=Duration: *)\d+:\d+:\d+.\d+/g;
	const dbRegex = /(?<=M: *)-?\d+(\.\d+)?/g;
	const timeRegex = /(?<=t: *)-?\d+(\.\d+)?/g;
	const logger = (message: string) => {
		const durationString = message?.match(durationRegex)?.[0];
		const volumeString = message?.match(dbRegex)?.[0];
		const timeString = message?.match(timeRegex)?.[0];

		if (durationString) {
			duration = timecodeToSeconds(durationString);
		}

		const volume = volumeString ? parseFloat(volumeString) : null;
		const time = timeString ? parseFloat(timeString) : null;
		if (volume !== null && time !== null) {
			progress?.(time / duration, time, duration);

			volumes.push(volume);
		}
	};

	return new Promise<number[]>((resolve, reject) => {
		const args = [
			'-i',
			input,
			'-filter_complex',
			'ebur128',
			'-f',
			'null',
			'-',
		];
		const process = spawn('ffmpeg', args);

		process.stderr.on('data', data => {
			// console.log(`ffmpeg: ${data}`);
			logger(data.toString());
		});

		process.on('close', code => {
			if (code == 0) resolve(volumes);
			else reject(code);
		});
	});
};

export default getVolumes;

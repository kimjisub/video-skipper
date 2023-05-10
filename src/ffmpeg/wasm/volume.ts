import { createFFmpeg, fetchFile, LogCallback } from '@ffmpeg/ffmpeg';

const getVolumes = async (input: string): Promise<number[]> => {
	const dbs: number[] = [];

	const dbRegex = /(?<=M: *)-?\d+(\.\d+)?/g;
	const timeRegex = /(?<=t: *)-?\d+(\.\d+)?/g;
	const logger: LogCallback = ({ message }) => {
		// console.log(`ffmpeg: ${type} ${message}`);

		const dbString = message?.match(dbRegex)?.[0];
		const timeString = message?.match(timeRegex)?.[0];

		const db = dbString ? parseFloat(dbString) : null;
		const time = timeString ? parseFloat(timeString) : null;
		if (db !== null && time !== null) {
			console.log(
				`time: ${time.toFixed(2)}s, volume: ${db.toFixed(2)}dB`,
			);

			dbs.push(db);
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

	return dbs;
};

export default getVolumes;

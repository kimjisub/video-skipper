import { LogCallback, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import fs from 'fs';

const removeBetween = async (
	input: string,
	output: string,
	times: { start: number; end: number }[],
) => {
	const logger: LogCallback = ({ type, message }) => {
		console.log(`ffmpeg: ${type} ${message}`);
	};

	const ffmpeg = createFFmpeg({
		log: false,
	});

	ffmpeg.setLogger(logger);
	await ffmpeg.load();

	// input file
	const inputBuffer = await fetchFile(input);
	ffmpeg.FS('writeFile', input, inputBuffer);

	const betweenStr = times
		.map(
			time =>
				`between(t,${time.start.toFixed(2)},${time.end.toFixed(2)})`,
		)
		.join('+');
	const args = [
		'-y',
		'-i',
		input,
		'-vf',
		`select='not(${betweenStr})',setpts=N/FRAME_RATE/TB`,
		'-af',
		`aselect='not(${betweenStr})',asetpts=N/SR/TB`,
		output,
	];

	await ffmpeg.run(...args);

	// output file
	const outputBuffer = ffmpeg.FS('readFile', output);
	await fs.promises.writeFile(output, outputBuffer);
};

export default removeBetween;

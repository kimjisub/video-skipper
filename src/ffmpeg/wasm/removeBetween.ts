import { LogCallback, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import fs from 'fs';
import { RemoveBetweenProps } from '..';
import { timecodeToSeconds } from '../../tools/math';

const removeBetween = async (props: RemoveBetweenProps) => {
	let duration = 0;
	const durationRegex = /(?<=Duration: *)\d+:\d+:\d+.\d+/g;
	const timeRegex = /(?<=time=)\d+:\d+:\d+.\d+/g;

	const logger: LogCallback = ({ type, message }) => {
		const durationString = message?.match(durationRegex)?.[0];
		const timeString = message?.match(timeRegex)?.[0];

		if (durationString) {
			duration = timecodeToSeconds(durationString);
		}
		const time = timeString ? timecodeToSeconds(timeString) : null;

		if (time !== null) {
			props.progress?.(time / duration, time, duration);
		}
	};

	const ffmpeg = createFFmpeg({
		log: false,
	});

	ffmpeg.setLogger(logger);
	await ffmpeg.load();

	// input file
	const inputBuffer = await fetchFile(props.input);
	ffmpeg.FS('writeFile', props.input, inputBuffer);

	const betweenStr = props.times
		.map(
			time =>
				`between(t,${time.start.toFixed(2)},${time.end.toFixed(2)})`,
		)
		.join('+');
	const args = [
		'-y',
		'-i',
		props.input,
		'-vf',
		`select='not(${betweenStr})',setpts=N/FRAME_RATE/TB`,
		'-af',
		`aselect='not(${betweenStr})',asetpts=N/SR/TB`,
		props.output,
	];

	await ffmpeg.run(...args);

	// output file
	const outputBuffer = ffmpeg.FS('readFile', props.output);
	await fs.promises.writeFile(props.output, outputBuffer);
};

export default removeBetween;

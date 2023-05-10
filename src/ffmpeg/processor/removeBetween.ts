import { spawn } from 'child_process';
import { RemoveBetweenProps } from '..';
import { timecodeToSeconds } from '../../tools/math';

const removeBetween = (props: RemoveBetweenProps) => {
	let duration = 0;
	const durationRegex = /(?<=Duration: *)\d+:\d+:\d+.\d+/g;
	const timeRegex = /(?<=time=)\d+:\d+:\d+.\d+/g;

	const logger = (message: string) => {
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

	const betweenStr = props.times
		.map(
			time =>
				`between(t,${time.start.toFixed(2)},${time.end.toFixed(2)})`,
		)
		.join('+');

	const params = [
		'-y',
		'-i',
		props.input,
		`-vf`,
		`select='not(${betweenStr})',setpts=N/FRAME_RATE/TB`,
		`-af`,
		`aselect='not(${betweenStr})',asetpts=N/SR/TB`,
		props.output,
	];
	return new Promise<void>((resolve, reject) => {
		const process = spawn('ffmpeg', params);

		process.stderr.on('data', data => {
			logger(data.toString());
		});

		process.on('close', code => {
			if (code == 0) resolve();
			else reject(0);
		});
	});
};

export default removeBetween;

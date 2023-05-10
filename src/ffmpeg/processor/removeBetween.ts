import { spawn } from 'child_process';

const removeBetween = (
	input: string,
	output: string,
	times: { start: number; end: number }[],
) => {
	const betweenStr = times
		.map(
			time =>
				`between(t,${time.start.toFixed(2)},${time.end.toFixed(2)})`,
		)
		.join('+');

	const params = [
		'-y',
		'-i',
		input,
		`-vf`,
		`select='not(${betweenStr})',setpts=N/FRAME_RATE/TB`,
		`-af`,
		`aselect='not(${betweenStr})',asetpts=N/SR/TB`,
		output,
	];
	return new Promise<void>((resolve, reject) => {
		const process = spawn('ffmpeg', params);
		let logs = '';

		process.stdout.on('data', data => {
			console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
		});

		process.stderr.on('data', data => {
			console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
		});

		process.on('close', code => {
			console.log(`ffmpeg: exited with code ${code}`);
			if (code == 0) resolve();
			else reject(logs);
		});
	});
};

export default removeBetween;

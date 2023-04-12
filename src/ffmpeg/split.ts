import { spawn } from 'child_process';

const split = (
	input: string,
	output: string,
	start: number,
	end: number,
	speed: number
) => {
	const t = (end - start) * (1 / speed);

	const params = [
		'-ss',
		`${start}`,
		'-i',
		input,
		'-t',
		`${t}`,
		'-filter_complex',
		`[0:v]setpts=${1 / speed}*PTS[v];[0:a]atempo=${speed}[a]`,
		'-map',
		'[v]',
		'-map',
		'[a]',
		'-y',
		output,
	];
	return new Promise<void>((resolve, reject) => {
		const process = spawn('ffmpeg', params);
		let logs = '';

		process.stdout.on('data', (data) => {
			console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
		});

		process.stderr.on('data', (data) => {
			console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
		});

		process.on('close', (code) => {
			console.log(`ffmpeg: exited with code ${code}`);
			if (code == 0) resolve();
			else reject(logs);
		});
	});
};

export default split;

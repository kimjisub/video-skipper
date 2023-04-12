import { spawn } from 'child_process';

const keyframeRemap = (input: string) => {
	const params = [
		'-i',
		input,
		'-x264opts',
		'keyint=1',
		'-preset',
		'ultrafast',
		'-y',
		'workspace/keyedited.mp4',
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

export default keyframeRemap;

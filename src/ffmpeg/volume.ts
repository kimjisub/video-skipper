import { spawn } from 'child_process';

const getVolumes = (input: string) => {
	const params = ['-i', input, '-filter_complex', 'ebur128', '-f', 'null', '-'];
	const regex = /(?<=M: )-?\d+(\.\d+)?/g;
	return new Promise<number[]>((resolve, reject) => {
		const process = spawn('ffmpeg', params);
		const volumes: number[] = [];
		let logs = '';

		process.stdout.on('data', (data) => {
			console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
		});

		process.stderr.on('data', (data) => {
			// console.log(`ffmpeg: ${data}`);
			logs += `${data}\n`;
			const input = `${data}`;
			const dbString = input.match(regex)?.[0];
			const db = dbString ? parseFloat(dbString) : null;
			if (db) volumes.push(db);
		});

		process.on('close', (code) => {
			console.log(`ffmpeg: exited with code ${code}`);
			if (code == 0) resolve(volumes);
			else reject(logs);
		});
	});
};

export default getVolumes;

import getVolumes from './ffmpeg/volume';

start();

async function start() {
	console.log('1. Analyzing Volume of Video');

	const volumes = await getVolumes('input.mp4');

	console.log(volumes, volumes.length);
}

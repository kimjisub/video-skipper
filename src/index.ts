import { plot } from 'nodeplotlib';
import getVolumes from './ffmpeg/volume';
import ResultPlot from './tools/result-plot';

start();

async function start() {
	console.log('1. Analyzing Volume of Video');

	const volumes = await getVolumes('input.mp4');

	const plot = new ResultPlot();

	plot.addVolumeData(volumes);

	plot.showGraph();

	console.log(volumes, volumes.length);
}

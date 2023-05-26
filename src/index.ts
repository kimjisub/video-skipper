import ResultPlot from './tools/result-plot';
import { parseArgs } from './tools/arg-parse';
import { average } from './tools/math';
import { optFuncs, roundList } from './tools/optimize';
import { getVolumes, removeBetween } from './ffmpeg';
import progress from 'progress';

const args = parseArgs();

const CHUNK_SIZE = 0.1;

start();

async function start() {
	console.log('1. Analyzing Volume of Video');

	const progress1 = new progress('[:bar] :percent :current/:total :elapsed', {
		complete: '=',
		incomplete: ' ',
		width: 40,
		total: 0,
	});
	const volumes = await getVolumes(
		{
			input: args.input,
			progress: (progress, curr, total) => {
				progress1.total = total;
				progress1.curr = parseFloat(curr.toFixed(1));
				progress1.tick();
			},
		},
		args.engine,
	);

	console.log('volumes', volumes);

	const plot = new ResultPlot();

	plot.addVolumeData(volumes);
	``;
	const standard_db = args.stdDb || average(volumes);
	plot.setStandardDbLevel(standard_db);
	plot.setStandardLevel(args.stdQuantized);

	// 기준 값으로 볼륨을 이진화합니다.
	const quantizedValue: number[] = [];
	for (const i in volumes)
		quantizedValue[i] = volumes[i] > standard_db ? 1 : 0;
	plot.addSoundedData(quantizedValue);

	// 이진화된 볼륨을 다시 라운딩합니다.
	const roundedQuantized = roundList(
		quantizedValue,
		args.sounded_round_range,
		optFuncs[args.sounded_round_method],
	);
	plot.addRoundingSoundedData(roundedQuantized);

	// 라운딩한 볼륨을 다시 이진화하여 최종 결과물에 반영합니다.
	const result = roundedQuantized.map(data =>
		data > args.stdQuantized ? 1 : 0,
	);
	plot.addRoundedSoundedData(result);

	if (args.debug) plot.showGraph();

	const editWorkList = [];
	//{start: 0, end: 1.4, sounded: true}
	let prevSounded = !result[0];
	let prevSec = 0;
	for (const _i in result) {
		const i = Number(_i);
		const sounded = result[i];
		const sec = i * CHUNK_SIZE;

		if (!!sounded != prevSounded || result.length - 1 == i) {
			editWorkList.push({
				start: prevSec,
				end: sec,
				sounded: prevSounded,
			});

			prevSounded = !!sounded;
			prevSec = sec;
		}
	}
	editWorkList.shift();
	console.log('total work:', editWorkList.length);
	console.log(
		'total time:',
		editWorkList.reduce((a, b) => a + b.end - b.start, 0),
	);
	console.log(
		'reduced time:',
		editWorkList.reduce(
			(a, b) => a + (!b.sounded ? b.end - b.start : 0),
			0,
		),
	);

	const progress2 = new progress('[:bar] :percent :current/:total :elapsed', {
		complete: '=',
		incomplete: ' ',
		width: 40,
		total: 0,
	});
	await removeBetween(
		{
			input: args.input,
			output: args.output,
			times: editWorkList.filter(work => !work.sounded),
			progress: (progress, curr, total) => {
				progress2.total = total;
				progress2.curr = parseFloat(curr.toFixed(1));
				progress2.tick();
			},
		},
		args.engine,
	);

	progress2.terminate();
}

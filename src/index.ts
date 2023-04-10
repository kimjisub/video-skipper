import { plot } from 'nodeplotlib';
import getVolumes from './ffmpeg/volume';
import ResultPlot from './tools/result-plot';
import { parseArgs } from './tools/arg-parse';
import { ensureDirSync, remove, removeSync } from 'fs-extra';
import { average } from './tools/math';
import { optFuncs, roundList } from './tools/optimize';

const args = parseArgs();

start();

async function start() {
	// 작업 폴더 초기화
	remove('workspace').finally(() => {
		ensureDirSync('workspace');
		ensureDirSync('workspace/videos');
	});

	console.log('1. Analyzing Volume of Video');

	const volumes = await getVolumes(args.input);

	const plot = new ResultPlot();

	plot.addVolumeData(volumes);

	const standard_db = args.standard_db || average(volumes);
	plot.setStandardDbLevel(standard_db);

	// 볼륨을 라운딩합니다.
	const roundedVolumes = roundList(
		volumes,
		args.volume_round_range,
		optFuncs[args.volume_round_method]
	);
	plot.addRoundedVolumeData(roundedVolumes);

	// 기준 값으로 볼륨을 이진화합니다.
	const quantizedVolume: number[] = [];
	for (const i in roundedVolumes)
		quantizedVolume[i] = roundedVolumes[i] > standard_db ? 1 : 0;
	plot.addSoundedData(quantizedVolume);

	// 이진화된 볼륨을 다시 라운딩합니다.
	const roundedQuantizedVolume = roundList(
		quantizedVolume,
		args.sounded_round_range,
		optFuncs[args.sounded_round_method]
	);
	plot.addRoundedSoundedData(roundedQuantizedVolume);

	// 라운딩한 볼륨을 다시 이진화하여 최종 결과물에 반영합니다.
	const result = roundedQuantizedVolume.map((data) => data > 0.5);
	plot.addRoundedSoundedData(result.map((data) => (data ? 1 : 0)));

	plot.showGraph();

	console.log(volumes, volumes.length);

	console.log('1. Analyzing Volume of Video');
}

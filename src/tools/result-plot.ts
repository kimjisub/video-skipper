import { Layout, Plot, PlotData, plot } from 'nodeplotlib';

class ResultPlot {
	private volumeData: number[] = [];
	private roundedVolumeData: number[] = [];
	private soundedData: number[] = [];
	private roundingSoundedData: number[] = [];
	private roundedSoundedData: number[] = [];
	private standardDbLevel = 0;
	private optionString = '보고서<br>';

	private volumeRoundingMethod: (x: number) => number = () => 1;
	private soundedRoundingMethod: (x: number) => number = () => 1;

	public showGraph(): void {
		const data: Plot[] = [
			{
				type: 'bar',
				mode: 'lines',
				name: 'Sounded',
				y: this.soundedData,
				xaxis: 'x',
				yaxis: 'y1',
				width: 1,
				marker: {
					color: '#EF285Eaa',
				},
			},
			{
				type: 'bar',
				mode: 'lines',
				name: 'Rounded Sounded',
				y: this.roundedSoundedData,
				xaxis: 'x',
				yaxis: 'y2',
				width: 1,
				marker: {
					color: '#F09D25aa',
				},
			},
			{
				type: 'scatter',
				mode: 'lines',
				name: 'Rounding Sounded',
				y: this.roundingSoundedData,
				xaxis: 'x',
				yaxis: 'y2',
			},
			{
				type: 'scatter',
				mode: 'lines',
				name: 'Volume',
				y: this.volumeData,
				xaxis: 'x',
				yaxis: 'y3',
			},
			{
				type: 'scatter',
				mode: 'lines',
				name: 'Rounded Volume',
				y: this.roundedVolumeData,
				xaxis: 'x',
				yaxis: 'y3',
			},
			{
				type: 'scatter',
				mode: 'lines',
				name: 'Standard dB',
				x: [0, this.soundedData.length],
				y: [this.standardDbLevel, this.standardDbLevel],
				xaxis: 'x',
				yaxis: 'y3',
			},
		];

		const layout: Partial<Layout> = {
			title: {
				text: this.optionString,
			},
			xaxis: {
				side: 'bottom',
				//range:[0,1],
				title: {
					text: 'Time',
				},
			},
			yaxis: {
				side: 'right',
				range: [0, 1],
				title: {
					text: 'Sounded',
				},
			},
			yaxis2: {
				side: 'right',
				overlaying: 'y',
				range: [0, 1],
			},
			yaxis3: {
				side: 'left',
				overlaying: 'y',
				//range:[0,1],
				title: {
					text: 'Volume (dB)',
				},
			},
		};
		plot(data, layout);

		// {
		// 	const scale = 100;
		// 	const xList = [];
		// 	const yList = [];
		// 	for (let i = -scale; i <= scale; i++) {
		// 		const x = i / scale;
		// 		const y = volumeRoundMethod(x);
		// 		xList.push(x);
		// 		yList.push(y);
		// 	}

		// 	plot.stack(
		// 		[
		// 			{
		// 				type: 'scatter',
		// 				mode: 'lines',
		// 				x: xList,
		// 				y: yList,
		// 				xaxis: 'x',
		// 				yaxis: 'y',
		// 				width: 1,
		// 			},
		// 		],
		// 		{
		// 			autosize: false,
		// 			width: 500,
		// 			height: 500,
		// 			title: {
		// 				text: 'Volume Round Method',
		// 			},
		// 			xaxis: {
		// 				side: 'bottom',
		// 				range: [-1, 1],
		// 				title: {
		// 					text: 'Relate',
		// 				},
		// 			},
		// 			yaxis: {
		// 				side: 'left',
		// 				range: [-1, 1],
		// 				title: {
		// 					text: 'Weight',
		// 				},
		// 			},
		// 		}
		// 	);
		// }

		// {
		// 	const scale = 100;
		// 	const xList = [];
		// 	const yList = [];
		// 	for (let i = -scale; i <= scale; i++) {
		// 		const x = i / scale;
		// 		const y = soundedRoundMethod(x);
		// 		xList.push(x);
		// 		yList.push(y);
		// 	}

		// 	plot.stack(
		// 		[
		// 			{
		// 				type: 'scatter',
		// 				mode: 'lines',
		// 				x: xList,
		// 				y: yList,
		// 				xaxis: 'x',
		// 				yaxis: 'y',
		// 				width: 1,
		// 			},
		// 		],
		// 		{
		// 			autosize: false,
		// 			width: 500,
		// 			height: 500,
		// 			title: {
		// 				text: 'Sounded Round Method',
		// 			},
		// 			xaxis: {
		// 				side: 'bottom',
		// 				range: [-1, 1],
		// 				title: {
		// 					text: 'Relate',
		// 				},
		// 			},
		// 			yaxis: {
		// 				side: 'left',
		// 				range: [-1, 1],
		// 				title: {
		// 					text: 'Weight',
		// 				},
		// 			},
		// 		}
		// 	);
		// }

		// plot.plot();
	}

	public addVolumeData(data: number[]): void {
		this.volumeData = data;
	}

	public addRoundedVolumeData(data: number[]): void {
		this.roundedVolumeData = data;
	}

	public addSoundedData(data: number[]): void {
		this.soundedData = data;
	}

	public addRoundingSoundedData(data: number[]): void {
		this.roundingSoundedData = data;
	}

	public addRoundedSoundedData(data: number[]): void {
		this.roundedSoundedData = data;
	}

	public setStandardDbLevel(data: number): void {
		this.standardDbLevel = data;
	}

	public appendOptionString(data: string): void {
		this.optionString += `<sup>${data}</sup><br>`;
	}

	public setVolumeRoundingMethod(func: (x: number) => number): void {
		this.volumeRoundingMethod = func;
	}

	public setSoundedRoundingMethod(func: (x: number) => number): void {
		this.soundedRoundingMethod = func;
	}
}

export default ResultPlot;

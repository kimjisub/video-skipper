export const optFuncs: ((x: number) => number)[] = [
	() => {
		return 1;
	},
	(x) => {
		return 1 - Math.pow(x, 2);
	},
	(x) => {
		if (x < 0) return Math.sqrt(1 - Math.pow(x, 2));
		else return (x + 1) * Math.pow(x - 1, 6);
	},
	(x) => {
		if (x < 0) return Math.sqrt(1 - Math.pow(x, 2));
		else return (x + 1) * Math.pow(x - 1, 6);
	},
	(x) => {
		if (x < 0) return Math.sqrt(1 - Math.pow(x, 2)) * ((1 / 3) * x + 1);
		else if (x < 0.9) return (x + 1) * Math.pow(x - 1, 4);
		else return 3;
	},
];

const optimizeValue = (
	value: number,
	weight: number,
	method: (x: number) => number
) => {
	return value * method(weight);
};

export const roundList = (
	input: number[],
	size: number,
	method: (x: number) => number
) => {
	const output: number[] = [];
	for (let i = 0; i < input.length; i++) {
		const start = Math.max(i - size, 0);
		const end = Math.min(i + size, input.length - 1);
		const length = end - start + 1;

		let maxTotal = 0;
		for (let j = start; j <= end; j++) {
			const weight = (j - i) / size || 0;
			maxTotal += optimizeValue(1, weight, method);
		}
		const maxAvg = maxTotal / length;

		let total = 0;
		for (let j = start; j <= end; j++) {
			const weight = (j - i) / size || 0;
			total += optimizeValue(input[j], weight, method);
		}
		const avg = (total / length) * (1 / maxAvg);

		output[i] = avg;
	}
	return output;
};

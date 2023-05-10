export const average = (arr: number[]) =>
	arr.reduce((p, c) => p + c, 0) / arr.length;

export const timecodeToSeconds = (timecode: string) => {
	const timeParts = timecode.split(':');
	const seconds =
		parseFloat(timeParts[0]) * 3600 +
		parseFloat(timeParts[1]) * 60 +
		parseFloat(timeParts[2]);
	return seconds;
};

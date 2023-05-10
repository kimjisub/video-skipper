import { ArgumentParser } from 'argparse';

const parser = new ArgumentParser({
	description: 'Skip Silent from Video',
});

parser.add_argument('-i', '--input', {
	type: String,
	dest: 'input',
	required: true,
	metavar: 'INPUT',
	help: 'Input file.',
	default: 'input.mp4',
});

parser.add_argument('-o', '--output', {
	type: String,
	dest: 'output',
	metavar: 'OUTPUT',
	help: 'Output file. (Default: output.mp4)',
	default: 'output.mp4',
});

parser.add_argument('-e', '--engine', {
	type: Number,
	dest: 'engine',
	metavar: 'ENGINE',
	help: 'FFMPEG engine (Default: wasm)',
	default: 'wasm',
	choices: ['wasm', 'process'],
});

parser.add_argument('-db', '--standard_db', {
	type: Number,
	dest: 'stdDb',
	metavar: 'STANDARD_dB',
	help: 'Set standard dB for recognition. (Default: avg)',
	default: NaN,
});

parser.add_argument('-std', '--standard', {
	type: Number,
	dest: 'stdQuantized',
	metavar: 'STANDARD',
	help: 'Set standard dB for recognition. (Default: -50)',
	default: 0.3,
});

parser.add_argument('-srr', '--sounded-round-range', {
	type: Number,
	dest: 'sounded_round_range',
	metavar: 'RANGE',
	help: 'Set sounded round range in chunk. (Default: 10)',
	default: 10,
});

parser.add_argument('-srm', '--sounded-round-method', {
	type: Number,
	dest: 'sounded_round_method',
	metavar: 'METHOD',
	help: 'Set sounded round method. (Default: 1)',
	default: 1,
	choices: ['0', '1', '2', '3'],
});

parser.add_argument('-d', '--debug', {
	type: Boolean,
	dest: 'debug',
	metavar: 'DEBUG',
	help: 'Show Debug web page. (Default: true)',
	default: false,
});

export const parseArgs = (): {
	input: string;
	output: string;
	engine: 'wasm' | 'process';
	stdDb: number;
	stdQuantized: number;

	sounded_round_range: number;
	sounded_round_method: number;
	debug: boolean;
} => parser.parse_args();

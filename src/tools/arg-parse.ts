import { ArgumentParser } from 'argparse';

const parser = new ArgumentParser({
	description: 'Video Smart Skipper',
});

parser.add_argument('-i', '--input', {
	type: String,
	dest: 'input',
	metavar: 'INPUT',
	help: 'Input file. (Default: input.mp4)',
	default: 'input.mp4',
});

parser.add_argument('-o', '--output', {
	type: String,
	dest: 'output',
	metavar: 'OUTPUT',
	help: 'Output file. (Default: output.mp4)',
	default: 'output.mp4',
});

parser.add_argument('-s', '--sounded_speed', {
	type: Number,
	dest: 'sounded_speed',
	metavar: 'SOUNDED_SPEED',
	help: 'Set sounded part speed. (Default: 1)',
	default: 1,
});

parser.add_argument('-ns', '--silent_speed', {
	type: Number,
	dest: 'silent_speed',
	metavar: 'SILENT_SPEED',
	help: 'Set silent part speed. (Default: Inf)',
	default: Infinity,
});

parser.add_argument('-db', '--standard_db', {
	type: Number,
	dest: 'standard_db',
	metavar: 'STANDARD_dB',
	help: 'Set standard dB for recognition. (Default: -50)',
	default: -50,
});

parser.add_argument('-vrr', '--volume-round-range', {
	type: Number,
	dest: 'volume_round_range',
	metavar: 'RANGE',
	help: 'Set volume round range in chunk. (Default: 3)',
	default: 3,
});

parser.add_argument('-srr', '--sounded-round-range', {
	type: Number,
	dest: 'sounded_round_range',
	metavar: 'RANGE',
	help: 'Set sounded round range in chunk. (Default: 10)',
	default: 10,
});

parser.add_argument('-vrm', '--volume-round-method', {
	type: Number,
	dest: 'volume_round_method',
	metavar: 'METHOD',
	help: 'Set volume round method. (Default: 3)',
	default: 3,
	choices: ['0', '1', '2', '3'],
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
	default: true,
});

export const parseArgs = () => parser.parse_args();

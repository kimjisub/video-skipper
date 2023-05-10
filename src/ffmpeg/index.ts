export interface GetVolumesProps {
	input: string;
	progress?: (progress: number, curr: number, total: number) => void;
}

export const getVolumes = async (
	props: GetVolumesProps,
	engine: 'wasm' | 'process',
) => {
	if (engine === 'wasm') {
		const { default: getVolumes } = await import('./wasm/getVolumes');
		return getVolumes(props);
	} else {
		const { default: getVolumes } = await import('./processor/getVolumes');
		return getVolumes(props);
	}
};

export interface RemoveBetweenProps {
	input: string;
	output: string;
	times: {
		start: number;
		end: number;
	}[];
	progress?: (progress: number, curr: number, total: number) => void;
}

export const removeBetween = async (
	props: RemoveBetweenProps,
	engine: 'wasm' | 'process',
) => {
	if (engine === 'wasm') {
		const { default: removeBetween } = await import('./wasm/removeBetween');
		return removeBetween(props);
	} else {
		const { default: removeBetween } = await import(
			'./processor/removeBetween'
		);
		return removeBetween(props);
	}
};

export interface Location {
	id: number;
	name: string;
	coordinates: {
		lat: number;
		long: number;
	};
}
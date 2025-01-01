export interface RawTag {
	id: string;
	name: string;
}

export class Tag {
	id: string;
	url: string;
	name: string;

	constructor(rawData: RawTag) {
		this.id = rawData.id;
		this.url = `/tags/${rawData.id}/`;
		this.name = rawData.name;
	}
}

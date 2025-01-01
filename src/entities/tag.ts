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
		this.url = `/tag/${this.id}/`;
		this.name = rawData.name;
	}
}

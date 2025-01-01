export interface RawNavItem {
	id: string;
	data: {
		name: string;
	};
}

export class NavItem {
	id: string;
	url: string;
	name: string;

	constructor(rawData: RawNavItem) {
		this.id = rawData.id;
		this.url = `/${this.id}/`;
		this.name = rawData.data.name;
	}
}

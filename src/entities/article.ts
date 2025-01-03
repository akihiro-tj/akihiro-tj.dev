import { type RawTag, Tag } from "./tag";

export interface RawArticle {
	id: string;
	publishedAt: string;
	updatedAt: string;
	showUpdatedAt: boolean;
	title: string;
	tags: RawTag[];
	content: string;
}

export class Article {
	id: string;
	url: string;
	publishedAt: Date;
	updatedAt: Date;
	showUpdatedAt: boolean;
	title: string;
	tags: Tag[];
	content: string;

	constructor(rawData: RawArticle) {
		this.id = rawData.id;
		this.url = `/article/${this.id}/`;
		this.publishedAt = new Date(rawData.publishedAt);
		this.updatedAt = new Date(rawData.updatedAt);
		this.showUpdatedAt = rawData.showUpdatedAt;
		this.title = rawData.title;
		this.tags = rawData.tags.map((rawTag) => {
			return new Tag(rawTag);
		});
		this.content = rawData.content;
	}
}

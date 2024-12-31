import type { Tag } from "./tag";

export class Article {
	id: string;
	publishedAt: Date;
	updatedAt: Date;
	title: string;
	tags: Tag[];
	content: string;

	constructor(
		id: string,
		publishedAt: string,
		updatedAt: string,
		title: string,
		tags: Tag[],
		content: string,
	) {
		this.id = id;
		this.publishedAt = new Date(publishedAt);
		this.updatedAt = new Date(updatedAt);
		this.title = title;
		this.tags = tags;
		this.content = content;
	}
}

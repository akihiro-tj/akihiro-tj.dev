export class Article {
	id: string;
	publishedAt: Date;
	updatedAt: Date;
	title: string;
	content: string;

	constructor(
		id: string,
		publishedAt: string,
		updatedAt: string,
		title: string,
		content: string,
	) {
		this.id = id;
		this.publishedAt = new Date(publishedAt);
		this.updatedAt = new Date(updatedAt);
		this.title = title;
		this.content = content;
	}
}

import { Article } from "@/entities/article";
import { Tag } from "@/entities/tag";
import { createMicroCmsClient } from "@/lib/microcms";

export interface IArticleRepository {
	find(id: string): Promise<Article>;
	findAll(): Promise<Article[]>;
}

export class ArticleRepository implements IArticleRepository {
	private microCmsClient = createMicroCmsClient();

	async find(id: string): Promise<Article> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
			contentId: id,
		});
		// @ts-ignore
		const tags = response.tags.map((tag) => {
			return new Tag(tag.id, tag.name);
		});
		const article = new Article(
			response.id,
			response.publishedAt,
			response.updatedAt,
			response.title,
			tags,
			response.content,
		);
		return article;
	}

	async findAll(): Promise<Article[]> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
		});
		// @ts-ignore
		const articles = response.contents.map((content) => {
			// @ts-ignore
			const tags = content.tags.map((tag) => {
				return new Tag(tag.id, tag.name);
			});
			return new Article(
				content.id,
				content.publishedAt,
				content.updatedAt,
				content.title,
				tags,
				content.content,
			);
		});
		return articles;
	}
}

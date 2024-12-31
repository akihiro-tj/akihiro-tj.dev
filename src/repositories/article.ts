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
			queries: {
				fields: ["id", "publishedAt", "updatedAt", "title", "tags", "content"],
			},
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
			queries: {
				fields: ["id", "publishedAt", "updatedAt", "title", "tags", "content"],
			},
		});
		const articles = response.contents
			// @ts-ignore
			.map((content) => {
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
			})
			// @ts-ignore
			.sort((a, b) => {
				return b.publishedAt.getTime() - a.publishedAt.getTime();
			});
		return articles;
	}
}

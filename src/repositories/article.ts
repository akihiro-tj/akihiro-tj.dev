import { Article } from "@/entities/article";
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
		const article = new Article(
			response.id,
			response.publishedAt,
			response.updatedAt,
			response.title,
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
			return new Article(
				content.id,
				content.publishedAt,
				content.updatedAt,
				content.title,
				content.content,
			);
		});
		return articles;
	}
}

import { Article } from "@/entities/article";
import { createMicroCmsClient } from "@/lib/microcms";
import { articleSchema } from "@/schemas/article";
import { microCmsContentsSchema } from "@/schemas/microcms-contents";

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
				fields: [
					"id",
					"publishedAt",
					"updatedAt",
					"showUpdatedAt",
					"title",
					"tags",
					"content",
				],
			},
		});
		const rawArticle = articleSchema.parse(response);
		const article = new Article(rawArticle);
		return article;
	}

	async findAll(): Promise<Article[]> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
			queries: {
				fields: [
					"id",
					"publishedAt",
					"updatedAt",
					"showUpdatedAt",
					"title",
					"tags",
					"content",
				],
			},
		});
		const rawContents = microCmsContentsSchema.parse(response.contents);
		const articles = rawContents
			.map((rawContent) => {
				const rawArticle = articleSchema.parse(rawContent);
				return new Article(rawArticle);
			})
			.sort((a, b) => {
				return b.publishedAt.getTime() - a.publishedAt.getTime();
			});
		return articles;
	}
}

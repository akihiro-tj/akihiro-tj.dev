import { Article } from "@/entities/article";
import { createMicroCmsClient } from "@/lib/microcms";
import { articleSchema } from "@/schemas/article";
import { microCmsContentsSchema } from "@/schemas/microcms-contents";

export interface IArticleRepository {
	find(contentId: string): Promise<Article>;
	findAll(): Promise<Article[]>;
	findByTag(tagId: string): Promise<Article[]>;
}

const commonQueries = {
	fields: "id,publishedAt,updatedAt,showUpdatedAt,title,tags,content",
	orders: "-publishedAt",
};

export class ArticleRepository implements IArticleRepository {
	private microCmsClient = createMicroCmsClient();

	async find(contentId: string): Promise<Article> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
			contentId,
			queries: {
				...commonQueries,
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
				...commonQueries,
			},
		});
		const rawContents = microCmsContentsSchema.parse(response.contents);
		const articles = rawContents.map((rawContent) => {
			const rawArticle = articleSchema.parse(rawContent);
			return new Article(rawArticle);
		});
		return articles;
	}

	async findByTag(tagId: string): Promise<Article[]> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
			queries: {
				...commonQueries,
				filters: `tags[contains]${tagId}`,
			},
		});
		const rawContents = microCmsContentsSchema.parse(response.contents);
		const articles = rawContents.map((rawContent) => {
			const rawArticle = articleSchema.parse(rawContent);
			return new Article(rawArticle);
		});
		return articles;
	}
}

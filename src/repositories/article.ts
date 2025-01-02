import { Article } from "@/entities/article";
import { createMicroCmsClient } from "@/libs/microcms";
import { articleSchema } from "@/schemas/article";
import { microCmsContentsSchema } from "@/schemas/microcms-contents";
import type { MicroCMSQueries } from "microcms-js-sdk";

export interface IArticleRepository {
	find(contentId: string): Promise<Article>;
	findAll(): Promise<Article[]>;
	findByTag(tagId: string): Promise<Article[]>;
}

const commonQueries: MicroCMSQueries = {
	filters:
		import.meta.env.HOSTING_ENVIRONMENT === "production"
			? "isPublished[equals]true"
			: "",
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
				filters: `${commonQueries.filters ? `${commonQueries.filters}[and]` : ""}tags[contains]${tagId}`,
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

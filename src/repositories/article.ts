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

const baseQueries: MicroCMSQueries = {
	fields: "id,publishedAt,updatedAt,showUpdatedAt,title,tags,content",
	orders: "-publishedAt",
};

const stagingQueries: MicroCMSQueries = {
	...baseQueries,
};

const productionQueries: MicroCMSQueries = {
	...baseQueries,
	filters: "isPublished[equals]true",
};

export class ArticleRepository implements IArticleRepository {
	private microCmsClient = createMicroCmsClient();
	private baseQueries =
		import.meta.env.HOSTING_ENVIRONMENT === "production"
			? productionQueries
			: stagingQueries;

	async find(contentId: string): Promise<Article> {
		const response = await this.microCmsClient.get({
			endpoint: "article",
			contentId,
			queries: {
				...this.baseQueries,
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
				...this.baseQueries,
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
				...this.baseQueries,
				filters: `${this.baseQueries.filters ? `${this.baseQueries.filters}[and]` : ""}tags[contains]${tagId}`,
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

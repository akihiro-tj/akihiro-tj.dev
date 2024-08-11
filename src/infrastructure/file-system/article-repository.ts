// @ts-ignore
import { getCollection } from "astro:content";
import type { ArticleRepository } from "@/domain/repositories/article-repository";
import type { Article } from "@/domain/entities/article";

export class ArticleRepositoryImpl implements ArticleRepository {
	async getAll() {
		const articleCollection = await getCollection("article");
		const articles: Article[] = articleCollection.map((entry) => ({
			id: entry.id,
			url: `/article/${entry.id}`,
			title: entry.data.title,
			description: entry.data.description,
			publishedDate: new Date(entry.data.publishedDate),
			updatedDate: entry.data.updatedDate
				? new Date(entry.data.updatedDate)
				: undefined,
			tags: entry.data.tags,
		}));
		return articles;
	}

	async getById(id: string) {
		const articles = await this.getAll();
		return articles.find((article) => article.id === id);
	}

	async getByTag(tag: string) {
		const articles = await this.getAll();
		return articles.filter((article) => article.tags?.includes(tag));
	}
}

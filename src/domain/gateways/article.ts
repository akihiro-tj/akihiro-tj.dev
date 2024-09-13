import type { Article } from "@/domain/models/article";

export interface ArticleGateway {
	getAll(): Promise<Article[]>;
	getById(id: string): Promise<Article | undefined>;
	getByTag(tag: string): Promise<Article[]>;
}

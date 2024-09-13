import type { Article } from "@/domain/models/article";

export interface ArticleRepository {
	getAll(): Promise<Article[]>;
	getById(id: string): Promise<Article | undefined>;
	getByTag(tag: string): Promise<Article[]>;
}

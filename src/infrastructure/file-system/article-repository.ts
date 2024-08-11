// @ts-ignore
import { getCollection } from "astro:content";
import type { ArticleRepository } from "@/domain/repositories/article-repository";
import type { Article } from "@/domain/entities/article";
import type { TagRepository } from "@/domain/repositories/tag-repository";
import type { Tag } from "@/domain/entities/tag";

export class ArticleRepositoryImpl implements ArticleRepository {
	private tagRepository: TagRepository;

	constructor(tagRepository: TagRepository) {
		this.tagRepository = tagRepository;
	}

	async getAll() {
		const articleCollection = await getCollection("article");
		const tags = await this.tagRepository.getAll();

		const articles: Article[] = articleCollection.map((entry) => {
			const articleTags = entry.data.tags
				?.map((tagId: string) => {
					return tags.find((tag) => tag.id === tagId);
				})
				.filter((tag): tag is Tag => !!tag);

			return {
				id: entry.slug,
				url: `/article/${entry.slug}`,
				title: entry.data.title,
				description: entry.data.description,
				publishedDate: entry.data.publishedDate,
				updatedDate: entry.data.updatedDate ?? undefined,
				tags: articleTags,
			};
		});
		return articles;
	}

	async getById(id: string) {
		const articles = await this.getAll();
		return articles.find((article) => article.id === id);
	}

	async getByTag(tagId: string) {
		const articles = await this.getAll();
		return articles.filter((article) => {
			const tagIds = article.tags?.map((tag) => tag.id);
			return tagIds?.includes(tagId);
		});
	}
}

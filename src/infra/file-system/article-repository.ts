// @ts-ignore
import { getCollection } from "astro:content";
import type { ArticleGateway } from "@/domain/gateways/article";
import type { Article } from "@/domain/models/article";
import type { TagGateway } from "@/domain/gateways/tag";
import type { Tag } from "@/domain/models/tag";

function formatDate(date: Date) {
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
}

export class ArticleRepository implements ArticleGateway {
	private tagRepository: TagGateway;

	constructor(tagRepository: TagGateway) {
		this.tagRepository = tagRepository;
	}

	async getAll() {
		const articleCollection = await getCollection("article");
		const tags = await this.tagRepository.getAll();

		const articlePromises: Promise<Article>[] = articleCollection.map(
			async (entry) => {
				const articleTags = entry.data.tags
					?.map((tagId: string) => {
						return tags.find((tag) => tag.id === tagId);
					})
					.filter((tag): tag is Tag => !!tag);

				const renderResult = await entry.render();
				const Content = renderResult.Content;

				return {
					id: entry.slug,
					url: `/article/${entry.slug}`,
					title: entry.data.title,
					publishedDate: entry.data.publishedDate,
					publishedDateStr: formatDate(entry.data.publishedDate),
					updatedDate: entry.data.updatedDate ?? undefined,
					updatedDateStr: entry.data.updatedDate
						? formatDate(entry.data.updatedDate)
						: undefined,
					tags: articleTags,
					Content,
				};
			},
		);

		const articles = await Promise.all(articlePromises);
		const sortedArticles = articles.sort((a, b) => {
			return a.publishedDate > b.publishedDate ? -1 : 1;
		});

		return sortedArticles;
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

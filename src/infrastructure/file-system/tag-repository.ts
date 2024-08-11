import type { Tag } from "@/domain/entities/tag";
import type { TagRepository } from "@/domain/repositories/tag-repository";
import { getCollection } from "astro:content";

export class TagRepositoryImpl implements TagRepository {
	async getAll() {
		const tagCollection = await getCollection("tag");
		const tags: Tag[] = tagCollection.map((entry) => ({
			id: entry.slug,
			url: `/tag/${entry.slug}`,
			name: entry.data.name,
		}));
		return tags;
	}

	async getById(id: string) {
		const tags = await this.getAll();
		return tags.find((tag) => tag.id === id);
	}
}

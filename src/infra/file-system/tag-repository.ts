import { getCollection } from "astro:content";
import type { Tag } from "@/domain/models/tag";
import type { TagGateway } from "@/domain/gateways/tag";

export class TagRepository implements TagGateway {
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

import { Tag } from "@/entities/tag";
import { createMicroCmsClient } from "@/lib/microcms";
import { microCmsContentsSchema } from "@/schemas/micro-cms-contents";
import { tagSchema } from "@/schemas/tag";

export interface ITagRepository {
	find(id: string): Promise<Tag>;
	findAll(): Promise<Tag[]>;
}

export class TagRepository implements ITagRepository {
	private microCmsClient = createMicroCmsClient();

	async find(id: string): Promise<Tag> {
		const response = await this.microCmsClient.get({
			endpoint: "tag",
			contentId: id,
			queries: {
				fields: ["id", "name"],
			},
		});
		const rawTag = tagSchema.parse(response);
		const tag = new Tag(rawTag);
		return tag;
	}

	async findAll(): Promise<Tag[]> {
		const response = await this.microCmsClient.get({
			endpoint: "tag",
			queries: {
				fields: ["id", "name"],
			},
		});
		const rawContents = microCmsContentsSchema.parse(response.contents);
		const tags = rawContents.map((rawContent) => {
			const rawTag = tagSchema.parse(rawContent);
			return new Tag(rawTag);
		});
		return tags;
	}
}

import { Tag } from "@/entities/tag";
import { createMicroCmsClient } from "@/lib/microcms";
import { microCmsContentsSchema } from "@/schemas/microcms-contents";
import { tagSchema } from "@/schemas/tag";

export interface ITagRepository {
	find(contentId: string): Promise<Tag>;
	findAll(): Promise<Tag[]>;
}

const commonQueries = {
	fields: "id,name",
};

export class TagRepository implements ITagRepository {
	private microCmsClient = createMicroCmsClient();

	async find(contentId: string): Promise<Tag> {
		const response = await this.microCmsClient.get({
			endpoint: "tag",
			contentId,
			queries: {
				...commonQueries,
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
				...commonQueries,
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

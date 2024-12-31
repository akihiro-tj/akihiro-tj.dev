import { Tag } from "@/entities/tag";
import { createMicroCmsClient } from "@/lib/microcms";

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
		});
		const tag = new Tag(response.id, response.name);
		return tag;
	}

	async findAll(): Promise<Tag[]> {
		const response = await this.microCmsClient.get({
			endpoint: "tag",
		});
		// @ts-ignore
		const tags = response.contents.map((content) => {
			return new Tag(content.id, content.name);
		});
		return tags;
	}
}

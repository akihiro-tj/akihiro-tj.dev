import { Tag } from "@/entities/tag";
import { createMicroCmsClient } from "@/libs/microcms";
import { microCmsContentsSchema } from "@/schemas/microcms-contents";
import { tagSchema } from "@/schemas/tag";
import type { MicroCMSQueries } from "microcms-js-sdk";

export interface ITagRepository {
	find(contentId: string): Promise<Tag>;
	findAll(): Promise<Tag[]>;
}

const baseQueries: MicroCMSQueries = {
	fields: "id,name",
};

const stagingQueries: MicroCMSQueries = {
	...baseQueries,
};

const productionQueries: MicroCMSQueries = {
	...baseQueries,
	filters: "isPublished[equals]true",
};

export class TagRepository implements ITagRepository {
	private microCmsClient = createMicroCmsClient();
	private baseQueries =
		import.meta.env.HOSTING_ENVIRONMENT === "production"
			? productionQueries
			: stagingQueries;

	async find(contentId: string): Promise<Tag> {
		const response = await this.microCmsClient.get({
			endpoint: "tag",
			contentId,
			queries: {
				...this.baseQueries,
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
				...this.baseQueries,
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

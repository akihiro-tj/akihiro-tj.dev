import type { Tag } from "@/domain/entities/tag";

export interface Article {
	id: string;
	url: string;
	title: string;
	description?: string;
	publishedDate: Date;
	updatedDate?: Date;
	tags?: Tag[];
}

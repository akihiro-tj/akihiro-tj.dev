import type { Tag } from "@/domain/entities/tag";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Article {
	id: string;
	url: string;
	title: string;
	publishedDate: Date;
	publishedDateStr: string;
	updatedDate?: Date;
	updatedDateStr?: string;
	tags?: Tag[];
	Content: AstroComponentFactory;
}

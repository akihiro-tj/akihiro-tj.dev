import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { Tag } from "@/domain/models/tag";

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

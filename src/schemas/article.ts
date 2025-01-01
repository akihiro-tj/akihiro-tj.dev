import type { RawArticle } from "@/entities/article";
import { schemaForType } from "@/lib/zod";
import { z } from "zod";
import { tagSchema } from "./tag";

export const articleSchema = schemaForType<RawArticle>()(
	z.object({
		id: z.string(),
		publishedAt: z.string(),
		updatedAt: z.string(),
		showUpdatedAt: z.boolean(),
		title: z.string(),
		tags: z.array(tagSchema),
		content: z.string(),
	}),
);

// @ts-ignore
import { z } from "astro:content";

export const articleFrontmatterSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	publishedDate: z.string(),
	updatedDate: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

export const tagFrontmatterSchema = z.object({
	id: z.string(),
	name: z.string(),
});

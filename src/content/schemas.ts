// @ts-ignore
import { z } from "astro:content";

export const articleFrontmatterSchema = z.object({
	title: z.string(),
	publishedDate: z.date(),
	updatedDate: z.date().optional(),
	tags: z.array(z.string()).optional(),
});

export const tagFrontmatterSchema = z.object({
	name: z.string(),
});

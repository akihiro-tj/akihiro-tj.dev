// @ts-ignore
import { defineCollection } from "astro:content";
import { articleFrontmatterSchema, tagFrontmatterSchema } from "./schemas";

const article = defineCollection({
	type: "content",
	schema: articleFrontmatterSchema,
});

const tag = defineCollection({
	type: "content",
	schema: tagFrontmatterSchema,
});

export const collections = { article, tag };

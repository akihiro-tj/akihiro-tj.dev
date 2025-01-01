import { defineCollection, z } from "astro:content";

const navCollection = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
	}),
});

export const collections = {
	nav: navCollection,
};

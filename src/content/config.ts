import { defineCollection, reference, z } from 'astro:content'; // eslint-disable-line import/no-unresolved

const post = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.string().transform(val => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform(val => (val ? new Date(val) : undefined)),
    tagIDs: z.array(z.string()).optional(),
    relatedPosts: z.array(reference('post')).optional(),
  }),
});

const tag = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const collections = { post, tag };

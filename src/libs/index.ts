import type { PostMetadata, TagMetadata } from '../types';
import type { CollectionEntry } from 'astro:content';

export const extractPostMetadata = (
  post: CollectionEntry<'post'>,
): PostMetadata => ({
  id: post.slug,
  title: post.data.title,
  url: '/post/' + post.slug,
  publishedDate: post.data.publishedDate,
  updatedDate: post.data.updatedDate,
});

export const extractTagMetadata = (
  tag: CollectionEntry<'tag'>,
): TagMetadata => ({
  id: tag.id,
  url: '/tag/' + tag.id,
  name: tag.data.name,
});

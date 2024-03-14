import rss from '@astrojs/rss'; // eslint-disable-line import/no-unresolved
import { getCollection } from 'astro:content'; // eslint-disable-line import/no-unresolved

import { SITE_TITLE, SITE_DESCRIPTION } from '../configs';

export async function get(context) {
  const posts = await getCollection('post');

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      link: '/post/' + post.slug,
    })),
  });
}

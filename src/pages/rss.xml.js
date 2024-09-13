import { SITE_NAME } from "@/constants";
import { ArticleRepository } from "@/infra/file-system/article-repository";
import { TagRepository } from "@/infra/file-system/tag-repository";
import rss from "@astrojs/rss";

export async function GET(context) {
	const tagRepository = new TagRepository();
	const articleRepository = new ArticleRepository(tagRepository);
	const articles = await articleRepository.getAll();
	return rss({
		title: SITE_NAME,
		description: "",
		site: context.site,
		items: articles.map((article) => ({
			title: article.title,
			link: article.url,
			pubDate: article.publishedDate,
		})),
	});
}

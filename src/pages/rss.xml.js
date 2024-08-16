import { SITE_NAME } from "@/constants";
import { ArticleRepositoryImpl } from "@/infrastructure/file-system/article-repository";
import { TagRepositoryImpl } from "@/infrastructure/file-system/tag-repository";
import rss from "@astrojs/rss";

export async function GET(context) {
	const tagRepository = new TagRepositoryImpl();
	const articleRepository = new ArticleRepositoryImpl(tagRepository);
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

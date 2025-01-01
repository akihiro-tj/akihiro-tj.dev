import { site } from "@/constant";
import { ArticleRepository } from "@/repositories/article";
import rss from "@astrojs/rss";

export async function GET(context) {
	const articleRepository = new ArticleRepository();
	const articles = await articleRepository.findAll();
	return rss({
		title: site.title,
		description: site.description,
		site: context.site,
		items: articles.map((article) => ({
			title: article.title,
			link: article.url,
			pubDate: article.publishedAt,
		})),
	});
}

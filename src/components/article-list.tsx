import type { Article } from "@/domain/entities/article";
import { Separator } from "@/components/separator";

export interface ArticleListProps {
	articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
	return (
		<ul>
			{articles.map((article) => (
				<li key={article.id}>
					<span className="flex items-baseline space-x-3">
						<span className="flex items-center h-5 space-x-3">
							<time dateTime={article.publishedDate.toISOString()}>
								{article.publishedDateStr}
							</time>
							<Separator orientation="vertical" />
						</span>
						<a href={article.url}>{article.title}</a>
					</span>
				</li>
			))}
		</ul>
	);
};

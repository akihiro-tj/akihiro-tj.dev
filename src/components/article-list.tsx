import type { Article } from "@/entities/article";
import { formatDate } from "@/lib/utils";

export interface ArticleListProps {
	articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
	return (
		<ul className="flex flex-col gap-5 lg:gap-6">
			{articles.map((article) => (
				<li key={article.id}>
					<a className="flex flex-col gap-1 group w-fit" href={article.url}>
						<span className="leading-tight font-semibold text-lg lg:text-xl no-underline group-hover:underline">
							{article.title}
						</span>
						<time
							className="text-sm text-gray-500"
							dateTime={article.publishedAt.toISOString()}
						>
							{formatDate(article.publishedAt)}
						</time>
					</a>
				</li>
			))}
		</ul>
	);
};

import type React from "react";
import { Badge } from "@/components/badge";
import type { Tag } from "@/domain/entities/tag";

export interface TagListProps {
	tags: Tag[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
	return (
		<ul className="flex gap-2">
			{tags.map((tag) => (
				<li key={tag.id}>
					<a href={tag.url} className="block size-full">
						<Badge variant="outline">{tag.name}</Badge>
					</a>
				</li>
			))}
		</ul>
	);
};

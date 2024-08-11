import type { Tag } from "@/domain/entities/tag";

export interface TagRepository {
	getAll(): Promise<Tag[]>;
	getById(id: string): Promise<Tag | undefined>;
}

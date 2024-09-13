import type { Tag } from "@/domain/models/tag";

export interface TagRepository {
	getAll(): Promise<Tag[]>;
	getById(id: string): Promise<Tag | undefined>;
}

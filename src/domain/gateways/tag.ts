import type { Tag } from "@/domain/models/tag";

export interface TagGateway {
	getAll(): Promise<Tag[]>;
	getById(id: string): Promise<Tag | undefined>;
}

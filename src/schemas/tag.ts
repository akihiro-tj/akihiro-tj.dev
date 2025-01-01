import type { RawTag } from "@/entities/tag";
import { schemaForType } from "@/libs/zod";
import { z } from "zod";

export const tagSchema = schemaForType<RawTag>()(
	z.object({
		id: z.string(),
		name: z.string(),
	}),
);

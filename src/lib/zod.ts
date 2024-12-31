import type { z } from "zod";

export const schemaForType =
	<T>() =>
	// @ts-ignore
	<S extends z.ZodType<T, unknown, unknown>>(arg: S) => {
		return arg;
	};

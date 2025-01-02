import { createMicroCmsClient } from "@/libs/microcms";
import { TagRepository } from "@/repositories/tag";
import { expect, it, vi } from "vitest";

vi.mock("@/libs/microcms");

const setupTestEnvironment = (environment: string) => {
	const mockMicroCmsClient = { get: vi.fn() };
	// FIXME: Fix the type error
	// @ts-ignore
	vi.mocked(createMicroCmsClient).mockReturnValue(mockMicroCmsClient);
	import.meta.env.HOSTING_ENVIRONMENT = environment;

	return { repository: new TagRepository(), mockMicroCmsClient };
};

const mockResponseFind = {
	id: "1",
	name: "Tag 1",
};

const mockResponseFindAll = {
	contents: [
		{
			id: "1",
			name: "Tag 1",
		},
	],
};

it.each([
	{ environment: "staging", expectedFilters: null },
	{ environment: "production", expectedFilters: "isPublished[equals]true" },
])(
	"TagRepository.find should set filters correctly in $environment",
	async ({ environment, expectedFilters }) => {
		const { repository, mockMicroCmsClient } =
			setupTestEnvironment(environment);

		mockMicroCmsClient.get.mockResolvedValue(mockResponseFind);

		await repository.find("1");

		expect(mockMicroCmsClient.get).toHaveBeenCalledWith(
			expect.objectContaining({
				queries: expectedFilters
					? expect.objectContaining({ filters: expectedFilters })
					: expect.not.objectContaining({ filters: expect.anything() }),
			}),
		);
	},
);

it.each([
	{ environment: "staging", expectedFilters: null },
	{ environment: "production", expectedFilters: "isPublished[equals]true" },
])(
	"TagRepository.findAll should set filters correctly in $environment",
	async ({ environment, expectedFilters }) => {
		const { repository, mockMicroCmsClient } =
			setupTestEnvironment(environment);

		mockMicroCmsClient.get.mockResolvedValue(mockResponseFindAll);

		await repository.findAll();

		expect(mockMicroCmsClient.get).toHaveBeenCalledWith(
			expect.objectContaining({
				queries: expectedFilters
					? expect.objectContaining({ filters: expectedFilters })
					: expect.not.objectContaining({ filters: expect.anything() }),
			}),
		);
	},
);

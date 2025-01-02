import { createMicroCmsClient } from "@/libs/microcms";
import { ArticleRepository } from "@/repositories/article";
import { expect, it, vi } from "vitest";

vi.mock("@/libs/microcms");

const setupTestEnvironment = (environment: string) => {
	const mockMicroCmsClient = { get: vi.fn() };
	// FIXME: Fix the type error
	// @ts-ignore
	vi.mocked(createMicroCmsClient).mockReturnValue(mockMicroCmsClient);
	import.meta.env.HOSTING_ENVIRONMENT = environment;

	return { repository: new ArticleRepository(), mockMicroCmsClient };
};

const mockResponseFind = {
	id: "1",
	publishedAt: "2023-01-01T00:00:00Z",
	updatedAt: "2023-01-02T00:00:00Z",
	showUpdatedAt: true,
	title: "Test Article",
	tags: [{ id: "tag1", name: "Tag 1" }],
	content: "This is the content of the article.",
};

const mockResponseFindAllOrTag = {
	contents: [
		{
			id: "1",
			publishedAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-02T00:00:00Z",
			showUpdatedAt: true,
			title: "Test Article",
			tags: [{ id: "tag1", name: "Tag 1" }],
			content: "This is the content of the article.",
		},
	],
};

it.each([
	{ environment: "staging", expectedFilters: null },
	{ environment: "production", expectedFilters: "isPublished[equals]true" },
])(
	"ArticleRepository.find should set filters correctly in $environment",
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
	"ArticleRepository.findAll should set filters correctly in $environment",
	async ({ environment, expectedFilters }) => {
		const { repository, mockMicroCmsClient } =
			setupTestEnvironment(environment);

		mockMicroCmsClient.get.mockResolvedValue(mockResponseFindAllOrTag);

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

it.each([
	{
		environment: "staging",
		tag: "tag1",
		expectedFilters: "tags[contains]tag1",
	},
	{
		environment: "production",
		tag: "tag1",
		expectedFilters: "isPublished[equals]true[and]tags[contains]tag1",
	},
])(
	"ArticleRepository.findByTag should set filters correctly in $environment",
	async ({ environment, tag, expectedFilters }) => {
		const { repository, mockMicroCmsClient } =
			setupTestEnvironment(environment);

		mockMicroCmsClient.get.mockResolvedValue(mockResponseFindAllOrTag);

		await repository.findByTag(tag);

		expect(mockMicroCmsClient.get).toHaveBeenCalledWith(
			expect.objectContaining({
				queries: expect.objectContaining({ filters: expectedFilters }),
			}),
		);
	},
);

import { getCollection, getEntry } from "astro:content";
import { NavItem } from "@/entities/nav-item";

export interface INavRepository {
	find(contentId: string): Promise<NavItem>;
	findAll(): Promise<NavItem[]>;
}

export class NavRepository implements INavRepository {
	async find(contentId: string): Promise<NavItem> {
		const rawNavItem = await getEntry("nav", contentId);
		if (!rawNavItem) {
			throw new Error(`NavItem not found for contentId: ${contentId}`);
		}
		const navItem = new NavItem(rawNavItem);
		return navItem;
	}

	async findAll(): Promise<NavItem[]> {
		const navItems = (await getCollection("nav")).map(
			(rawNavItem) => new NavItem(rawNavItem),
		);
		return navItems;
	}
}

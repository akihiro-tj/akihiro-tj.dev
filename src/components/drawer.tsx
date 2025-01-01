import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/sheet";
import { site } from "@/constant";
import type { NavItem } from "@/entities/nav-item";
import { AlignRight } from "lucide-react";

export type DrawerProps = {
	navItems: NavItem[];
};

export const Drawer: React.FC<DrawerProps> = ({ navItems }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					type="button"
					className="flex items-center justify-center size-10"
				>
					<AlignRight className="size-6" />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-4">
					<SheetTitle className="text-left">{site.title}</SheetTitle>
				</SheetHeader>
				<ul>
					{navItems.map((item) => (
						<li key={item.id} className="mb-3">
							<a href={item.url}>{item.name}</a>
						</li>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	);
};

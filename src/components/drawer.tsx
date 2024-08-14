import { AlignRight } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/sheet";
import { NAV_ITEMS, SITE_TITLE } from "@/constants";

export const Drawer: React.FC = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button type="button" className="block size-5">
					<AlignRight className="size-full" />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-4">
					<SheetTitle className="text-left">{SITE_TITLE}</SheetTitle>
				</SheetHeader>
				<ul>
					{NAV_ITEMS.map((item) => (
						<li key={item.id} className="mb-3">
							<a href={item.url}>{item.name}</a>
						</li>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	);
};

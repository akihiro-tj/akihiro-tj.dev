import { AlignRight } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/sheet";
import { NAV_ITEMS, SITE_NAME } from "@/constants";

export const Drawer: React.FC = () => {
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
					<SheetTitle className="text-left">{SITE_NAME}</SheetTitle>
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

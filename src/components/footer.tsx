import { Separator } from "@/components/separator";

export const Footer: React.FC = () => {
	return (
		<footer>
			<Separator />
			<small className="block py-4">
				<div className="text-center">
					&copy; 2024 -{" "}
					<a
						className="underline hover:no-underline"
						href="https://github.com/akihiro-tj"
						target="_blank"
						rel="noreferrer"
					>
						akihiro-tj
					</a>
				</div>
			</small>
		</footer>
	);
};

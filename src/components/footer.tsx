import { Separator } from "@/components/separator";

export const Footer: React.FC = () => {
	return (
		<footer>
			<Separator />
			<small className="flex flex-col gap-0.5 py-4">
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
				<div className="text-center">
					<a className="underline hover:no-underline" href="/privacy-policy">
						Privacy Policy
					</a>
				</div>
			</small>
		</footer>
	);
};

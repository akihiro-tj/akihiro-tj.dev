import type { PropsWithChildren } from "react";

export const Prose: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="prose lg:prose-lg prose-slate hover:prose-a:no-underline">
			{children}
		</div>
	);
};

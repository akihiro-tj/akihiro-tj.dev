import type { PropsWithChildren } from "react";

export const Prose: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="w-full prose lg:prose-lg hover:prose-a:no-underline">
			{children}
		</div>
	);
};

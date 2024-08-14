import type { PropsWithChildren } from "react";

export const MainColumn: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className="max-w-3xl mx-auto px-4 my-12 lg:my-14">{children}</main>
	);
};

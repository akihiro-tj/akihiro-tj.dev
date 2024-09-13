import type { PropsWithChildren } from "react";

export const MainColumn: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className="max-w-3xl mx-auto px-4 py-12 lg:py-14">{children}</main>
	);
};

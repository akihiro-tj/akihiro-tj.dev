import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://www.akihiro-tj.dev",
	server: {
		port: 3000,
	},
	integrations: [
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

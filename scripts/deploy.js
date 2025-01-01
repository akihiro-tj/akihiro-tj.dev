import "dotenv/config";
import https from "node:https";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline";

const DEPLOY_STAGING_HOOK_URL = process.env.DEPLOY_STAGING_HOOK_URL;
const DEPLOY_PROD_HOOK_URL = process.env.DEPLOY_PROD_HOOK_URL;

if (!DEPLOY_STAGING_HOOK_URL || !DEPLOY_PROD_HOOK_URL) {
	console.error(
		"Error: DEPLOY_STAGING_HOOK_URL or DEPLOY_PROD_HOOK_URL is not defined in .env file.",
	);
	process.exit(1);
}

const rl = readline.createInterface({
	input,
	output,
	terminal: true,
});

rl.input.setRawMode(true);

function sendRequest(env) {
	const hookUrl =
		env === "staging" ? DEPLOY_STAGING_HOOK_URL : DEPLOY_PROD_HOOK_URL;
	const url = new URL(hookUrl);

	const options = {
		hostname: url.hostname,
		path: url.pathname,
		method: "POST",
	};

	const req = https.request(options, (res) => {
		console.log(`Status Code: ${res.statusCode}`);

		res.on("data", (d) => {
			process.stdout.write(d);
		});
	});

	req.on("error", (e) => {
		console.error(e);
	});

	req.end();
}

function promptEnvironment(query) {
	return new Promise((resolve) => {
		output.write(query);
		let inputBuffer = "";

		input.on("data", (charBuffer) => {
			const char = charBuffer.toString();

			if (char === "\n" || char === "\r") {
				// Enter key
				input.removeAllListeners("data");
				output.write("\n");
				resolve(inputBuffer.trim());
			} else if (char === "\u0003") {
				// Ctrl+C
				process.exit();
			} else {
				inputBuffer += char;
			}
		});
	});
}

(async () => {
	const env = await promptEnvironment("Enter the environment (staging/prod): ");
	if (!["staging", "prod"].includes(env)) {
		console.error("Error: Invalid environment. Use 'staging' or 'prod'.");
		process.exit(1);
	}

	console.log("Environment confirmed. Sending request...");
	sendRequest(env);

	rl.close();
})();

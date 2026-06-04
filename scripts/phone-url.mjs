import os from "node:os";

const args = new Map();
for (const rawArg of process.argv.slice(2)) {
  const match = rawArg.match(/^--([^=]+)=(.+)$/);
  if (match) {
    args.set(match[1], match[2]);
  }
}

const port = Number(args.get("port") ?? process.env.PORT ?? 5173);
const scheme = args.get("scheme") ?? "http";
const path = args.get("path") ?? "/";
const normalizedPath = path.startsWith("/") ? path : `/${path}`;
const interfaces = os.networkInterfaces();
const addresses = [];

for (const [name, entries] of Object.entries(interfaces)) {
  for (const entry of entries ?? []) {
    if (entry.family !== "IPv4" || entry.internal) {
      continue;
    }
    addresses.push({ name, address: entry.address });
  }
}

console.log("PINECRAFT smartphone connection");
console.log("");
console.log("1. Start the server:");
console.log(port === 5173 ? "   npm run dev:phone" : "   npm run preview");
console.log("");
console.log("2. Open one of these URLs on your phone:");

if (addresses.length === 0) {
  console.log("   No LAN IPv4 address was found. Check Wi-Fi or network settings.");
} else {
  for (const { name, address } of addresses) {
    console.log(`   ${scheme}://${address}:${port}${normalizedPath}  (${name})`);
  }
}

console.log("");
console.log("Notes:");
console.log("- LAN URLs work only when the phone and this Mac are on the same Wi-Fi.");
console.log("- For outside access, deploy dist/ to HTTPS hosting or run a tunnel such as cloudflared/ngrok.");
console.log("- If iPhone Safari blocks fullscreen install, use the public HTTPS URL and add it to the Home Screen.");

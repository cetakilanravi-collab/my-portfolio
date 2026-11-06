"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { join } = require("node:path");

const port = Number(process.env.PORT || 5000);
const portfolioPath = join(__dirname, "Akilan R portfolio.html");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new RangeError(`Invalid PORT: ${process.env.PORT}`);
}

readFile(portfolioPath)
  .then((html) => {
    const server = createServer((request, response) => {
      const pathname = new URL(request.url || "/", "http://localhost").pathname;

      if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end();
        return;
      }

      if (pathname !== "/" && pathname !== "/Akilan%20R%20portfolio.html") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
      });
      response.end(request.method === "HEAD" ? undefined : html);
    });

    server.listen(port, "0.0.0.0", () => {
      console.log(`Portfolio server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to load portfolio HTML at ${portfolioPath}`, error);
    process.exitCode = 1;
  });

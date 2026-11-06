# my-portfolio

## Run locally

Requires Node.js. Start the server with:

```sh
npm start
```

Open [http://localhost:5000](http://localhost:5000). The server uses Render's
`PORT` environment variable when deployed.

## Deploy to Render

Create a **Web Service** from this GitHub repository. Set the runtime to
**Node**, the build command to `npm install`, and the start command to
`npm start`. No frontend build step is needed; the server serves the portfolio
HTML file directly.

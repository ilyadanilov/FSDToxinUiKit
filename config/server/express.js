import express from "express";
import path from "path";
const server = express();

// const staticMiddleware = express.static("dist");

const webpack = require("webpack");

const config = require("../webpack.dev");

const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
// server.use(staticMiddleware);
const expressStaticGzip = require("express-static-gzip");
server.use(
  expressStaticGzip("dist", {
    enableBrotli: true,
  })
);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

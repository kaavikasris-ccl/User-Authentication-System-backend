import http from "http";

import app from "./app";
import { config } from "@/config";

/**
 * --------------------
 * HTTP Server
 * --------------------
 */
const server = http.createServer(app);

/**
 * --------------------
 * Start Server
 * --------------------
 */
server.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
import http from "http";
import app from "@/app.js";
import { config } from "@/config/index.js";

/**
 * HTTP Server
 */
const server = http.createServer(app);

/**
 * Start Server
 */
server.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
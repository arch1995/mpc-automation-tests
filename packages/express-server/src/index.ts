import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env"), debug: true });

// eslint-disable-next-line import/first
import app from "./server";

// Start the application by listening to specific port
const port = Number(8080);
app.listen(port, () => {
  console.info(`Express application started on port: ${port}`);
});

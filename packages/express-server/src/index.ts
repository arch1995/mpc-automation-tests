import app from "./server";

// Start the application by listening to specific port
const port = Number(8080);
app.listen(port, () => {
  console.info(`Express application started on port: ${port}`);
});

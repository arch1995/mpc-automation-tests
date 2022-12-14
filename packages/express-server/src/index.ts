import app from "./server";

// Start the application by listening to specific port
const port = Number(80);
app.listen(port, () => {
  console.info(`Express application started on port: ${port}`);
});

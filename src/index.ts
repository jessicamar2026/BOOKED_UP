import dotenv from "dotenv";
import express, { Express } from "express";
import "./config.js";
import {
  createBook,
  deleteBookController,
  getBook,
  getBooks,
  updateBookController,
} from "./controllers/bookControllers.js";
import { AppDataSource } from "./dataSource.js";
dotenv.config();
await AppDataSource.initialize();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/books", getBooks);
app.get("/books/:bookId", getBook);
app.post("/books", createBook);
app.patch("/books/:bookId", updateBookController);
app.delete("/books/:bookId", deleteBookController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

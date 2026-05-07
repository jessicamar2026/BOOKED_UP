import { Request, Response } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../models/BookModel.js";

export async function getBooks(req: Request, res: Response): Promise<void> {
  const books = await getAllBooks();
  res.json({ books });
}

export async function getBook(req: Request, res: Response): Promise<void> {
  const bookId = req.params.bookId as string;

  const book = await getBookById(bookId);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json({ book });
}

export async function createBook(req: Request, res: Response): Promise<void> {
  const { title, author, pageCount } = req.body;
  const newBook = await addBook(title, author, pageCount);

  res.status(201).json({ book: newBook });
}

export async function updateBookController(
  req: Request,
  res: Response,
): Promise<void> {
  const bookId = req.params.bookId as string;

  const { title, author, pageCount } = req.body;

  const updatedBook = await updateBook(bookId, title, author, pageCount);

  if (!updatedBook) {
    res.status(404).json({
      error: "Book not found",
    });

    return;
  }

  res.json({
    book: updatedBook,
  });
}

export async function deleteBookController(
  req: Request,
  res: Response,
): Promise<void> {
  const bookId = req.params.bookId as string;

  const deleted = await deleteBook(bookId);

  if (!deleted) {
    res.status(404).json({
      error: "Book not found",
    });

    return;
  }

  res.status(204).send();
}

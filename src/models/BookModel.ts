import { AppDataSource } from "../dataSource.js";
import { Book } from "../entities/Book.js";

const bookRepository = AppDataSource.getRepository(Book);

async function getAllBooks(): Promise<Book[]> {
  return bookRepository.find();
}

async function getBookById(bookId: string): Promise<Book | null> {
  return bookRepository.findOne({ where: { bookId } });
}
async function addBook(title: string,author: string,pageCount: number
): Promise<Book> {

  const book = new Book();

  book.title = title;
  book.author = author;
  book.pageCount = pageCount;

  return bookRepository.save(book);
}


export { getAllBooks,getBookById,addBook,updateBook,deleteBook };
async function updateBook(
  bookId: string,
  title: string,
  author: string,
  pageCount: number
): Promise<Book | null> {

  const book = await bookRepository.findOne({
    where: { bookId }
  });

  if (!book) {
    return null;
  }

  book.title = title;
  book.author = author;
  book.pageCount = pageCount;

  return bookRepository.save(book);
}

async function deleteBook(
  bookId: string
): Promise<boolean> {

  const book = await bookRepository.findOne({
    where: { bookId }
  });

  if (!book) {
    return false;
  }

  await bookRepository.remove(book);

  return true;
}
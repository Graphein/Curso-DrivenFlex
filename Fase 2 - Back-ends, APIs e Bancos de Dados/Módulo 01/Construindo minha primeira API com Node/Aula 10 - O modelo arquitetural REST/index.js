import express, { json } from "express";
import httpStatus from "http-status";

const app = express();
app.use(json());

const books = []; // {title: string, author: string}

app.post("/books", (req, res) => {
  const { body } = req;
  books.push({
    id: books.length + 1,
    ...body
  });

  return res.sendStatus(httpStatus.CREATED);
});

app.get("/books", (req, res) => {
  const id = req.body?.id;
  if (id) {
    const book = books.find(book => { book.id === id });
    if (!book) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.send(book);
  }

  return res.send(books);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));
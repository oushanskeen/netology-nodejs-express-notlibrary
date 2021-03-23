const booksController = require('../../service/controllers/book');

module.exports = (app) => {
  app.get('/api/books', booksController.getBooksHandler);
  app.get('/api/books/:id', booksController.getBookHandler);
  app.post('/api/books', booksController.postBookHandler);
  app.put('/api/books/:id', booksController.putBookHandler);
  app.delete('/api/books/:id', booksController.deleteBookHandler);
}

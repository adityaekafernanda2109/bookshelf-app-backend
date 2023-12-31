const { nanoid } = require("nanoid");
const books = require('./books');

// Fungsi tambah buku
const addNewBookHandler = (request, h) => {
  const {
    name,
    year,
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, 
    name, 
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    finished, 
    reading, 
    insertedAt, 
    updatedAt,
  };
  if (newBook.name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
} else if (newBook.pageCount < newBook.readPage) {
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      return response;
} else if (!(newBook.name === undefined) && (newBook.pageCount >= newBook.readPage)) {
    const response = h.response ({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId : id,
        },
    });
    
    books.push(newBook);

    response.code(201);
    return response;
} else {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
  };
};

// fungsi ambil buku
const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
    let book;
  const response = h.response({
    status: 'success',
    data: {
      books : books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
const getBooksWithId = (request, h) => {
    const {id} = request.params;
    const book = books.filter((nId) => nId.id ===id)[0];
    if (book !== undefined) {
        return {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher,
          status: 'success',
          data: {
            book,
          },
        };
      }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// fungsi update data buku
const updateBooks = (request, h) => {
    const {bookId} = request.params
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    }
    = request.payload;
    let checkBookName = false;
    if ((name === undefined) || (name === '') || !name) {
        checkBookName = true;
    }

    if (checkBookName) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    let checkReadPage = false;
    if (readPage > pageCount) {
        checkReadPage = true;
    }

    if (checkReadPage) {
        const response = h.response ({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
    }

    let checkId = true;
    for ( const value of books ) {
        if(value.id === bookId) {
            checkId = false;
        }
    }
    if (checkId) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });

    books[index] = {...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    };
    response.code(200);
    return response;
};

// fungsi menghapus buku
const deleteBooks = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
  
      response.code(200);
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  
    response.code(404);
    return response;
  };
       




module.exports = { 
  addNewBookHandler, 
  getAllBooksHandler, 
  getBooksWithId, 
  updateBooks, 
  deleteBooks };
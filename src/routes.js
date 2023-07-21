const {addNewBookHandler, 
    getAllBooksHandler, 
    getBooksWithId, 
    updateBooks, 
    deleteBooks
} = require('./handler');

const routes = [{
  method: 'POST',
  path: '/books',
  handler: addNewBookHandler,
},
{
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
},
{
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksWithId,
},
{
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooks,
},
{
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooks,
},
];

module.exports = routes;




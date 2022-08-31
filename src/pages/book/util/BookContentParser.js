/**
 * 
 * @param {Object} books list of books
 * @returns new book list
 */
export function BookListParser(books) {
  const newList = books.map((book, index) => {
    return ({
      ...book,
      key: index,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newList;
}

/**
 * 
 * @param {Object} content Content of the paged response
 * @returns parsed content list
 */
export function BookContentParser(content) {
  const newContent = content.map((book, index) => {
    return ({
      ...book,
      key: index,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newContent;
}

export function BookContentParserWithUserListInfo(response, favoriteBooks, readBooks) {
  const newContent = response.content.map((book, index) => {
    return ({
      ...book,
      key: index,
      publicationDate: book.publicationDate.slice(0, 10),
      isFavorite: favoriteBooks.includes(book.id),
      isRead: readBooks.includes(book.id)
    });
  });

  return newContent;
}

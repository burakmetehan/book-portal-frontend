export function BookListParser(response) {
  const newList = response.map((book, index) => {
    return ({
      ...book,
      key: index,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newList;
}

export function BookContentParser(response) {
  const newContent = response.content.map((book, index) => {
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

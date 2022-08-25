// Book Content Parser for Paged Response

/**
 * 
 * @param {Object} responseData data object of the response (response.data)
 * @returns content of the paged response data
 */
export default function BookContentParser(responseData) {
  const newContent = responseData.content.map((book, index) => {
    return ({
      ...book,
      key: index,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newContent;
}

export function BookContentParserWithUserListInfo(responseData, favoriteBooks, readBooks) {
  const newContent = responseData.content.map((book, index) => {
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

export function BookListParser(responseData) {
  console.log(responseData)
  const newContent = responseData.map((book) => {
    return ({
      ...book,
      key: book.id,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newContent;
}

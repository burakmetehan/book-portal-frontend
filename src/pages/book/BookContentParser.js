// Book Content Parser for Paged Response

/**
 * 
 * @param {Object} responseData data object of the response (response.data)
 * @returns content of the paged response data
 */
export default function UserContentParser(responseData) {
  const newContent = responseData.content.map((book) => {
    return ({
      ...book,
      key: book.id,
      publicationDate: book.publicationDate.slice(0, 10)
    });
  });

  return newContent;
}

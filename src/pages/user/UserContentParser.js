// User Content Parser for Paged Response

/**
 * 
 * @param {Object} responseData data object of the response (response.data)
 * @returns content of the paged response data
 */
export default function UserContentParser(responseData) {
  const newContent = responseData.content.map((user) => {

    const readList = user.readList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const favoriteList = user.favoriteList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const roles = user.roles.map((role) => {
      return {
        ...role,
        key: role.id
      }
    });

    return ({
      key: user.id,
      username: user.username,
      readList: readList,
      favoriteList: favoriteList,
      roles: roles
    });
  });

  return newContent;
}

export function UserListParser({ responseData }) {
  console.log("Hello from UserLsitParse")
  console.log(responseData);
  const newContent = responseData.map((user) => {

    
    const readList = user.readList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const favoriteList = user.favoriteList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const roles = user.roles.map((role) => {
      return {
        ...role,
        key: role.id
      }
    });

    return ({
      key: user.id,
      username: user.username,
      readList: readList,
      favoriteList: favoriteList,
      roles: roles
    });
  });

  return newContent;
}
import axios from "axios";
//import LocalStorageService from "../../fetch-example/LocalStorageService";

const UserService = (function () {
  const _fetchUsers = async (params) => {
    const response = await axios.get("https://randomuser.me/api", {
      params: {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params
      }
    });

    if (!response) {
      console.log("Bir hata oluştu");
      return;
    }

    return response.data;
  };

  return {
    fetchUsers: _fetchUsers
  };
})();

export default UserService;

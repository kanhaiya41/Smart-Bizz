import API from "./axiosInstance";

const businessOwnerApi = {
  getTenants: () => API.get("/owner/get-all-teanants"),
  getUsers: () => API.get("/owner/all-users-with-messages"),
  getProfile: () => API.get("/owner/getProfile"),
};

export default businessOwnerApi;

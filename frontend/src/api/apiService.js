import API from "./axiosInstance";

const businessOwnerApi = {
  getTenants: () => API.get("/owner/get-all-teanants"),
  getUsers: () => API.get("/users"),
  getProfile: () => API.get("/profile"),
};

export default businessOwnerApi;

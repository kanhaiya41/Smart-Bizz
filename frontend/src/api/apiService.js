import API from "./axiosInstance";

const businessOwnerApi = {
  getTenants: () => API.get("owner/get-all-teanants"),
  getUsers: () => API.get("owner/all-users-with-messages"),
  getProfile: () => API.get("owner/getProfile"),
  uploadInventory: (data) => API.post("owner/upload-inventry", data),
  getInventory: () => API.get("owner/get-inventory"),
};

export default businessOwnerApi;

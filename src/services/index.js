import http from "./http";

export const getProducts = async (page, search) => {
  const { data: response } = await http.get(
    `/admin/products?search=${search}&page=${page}`
  );
  return response;
};
export const getFeaturedProducts = async () => {
  const { data: response } = await http.get("/admin/products/featured");
  return response;
};
export const getProductDetails = async (name) => {
  const { data: response } = await http.get(`/admin/products/${name}`);
  return response;
};
export const newProduct = async (payload) => {
  const { data: response } = await http.post(`/admin/products`, payload);
  return response;
};
export const updateProduct = async ({ id, ...payload }) => {
  const { data: response } = await http.put(`/admin/products/${id}`, payload);
  return response;
};
export const deleteProduct = async (id) => {
  const { data: response } = await http.delete(`/admin/products/${id}`);
  return response;
};
export const getUsers = async (page, search) => {
  const { data: response } = await http.get(
    `/admin/users?search=${search}&page=${page}`
  );
  return response;
};
export const getUser = async (id) => {
  const { data: response } = await http.get(`/admin/users/${id}`);
  return response;
};
export const userStatus = async ({ id, ...payload }) => {
  const { data: response } = await http.put(`/admin/users/${id}`, payload);
  return response;
};
export const userDelete = async (id) => {
  const { data: response } = await http.delete(`/admin/users/${id}`);
  return response;
};
export const getCategories = async (page, search) => {
  const { data } = await http.get(
    `/admin/categories?search=${search}&page=${page}`
  );
  return data;
};
export const getCategory = async (id) => {
  const { data } = await http.get(`/admin/categories/${id}`);
  return data;
};
export const getAllCategories = async (id) => {
  const { data } = await http.get(`/admin/categories/all-categories`);
  return data;
};
export const deleteCategory = async (id) => {
  const { data } = await http.delete(`/admin/categories/${id}`);
  return data;
};
export const addCategory = async (payload) => {
  const { data } = await http.post(`/admin/categories`, payload);
  return data;
};
export const updateCategory = async ({ id, ...payload }) => {
  const { data } = await http.put(`/admin/categories/${id}`, payload);
  return data;
};

export const getSubCategories = async (page, search) => {
  const { data } = await http.get(
    `/admin/categories/sub-categories?search=${search}&page=${page}`
  );
  return data;
};
export const getSubCategory = async (id) => {
  const { data } = await http.get(`/admin/categories/sub-categories/${id}`);
  return data;
};
export const getAllSubCategories = async (id) => {
  const { data } = await http.get(
    `/admin/categories/sub-categories/all-categories`
  );
  return data;
};
export const deleteSubCategory = async (id) => {
  const { data } = await http.delete(`/admin/categories/sub-categories/${id}`);
  return data;
};
export const addSubCategory = async (payload) => {
  const { data } = await http.post(`/admin/categories/sub-categories`, payload);
  return data;
};
export const updateSubCategory = async ({ id, ...payload }) => {
  const { data } = await http.put(
    `/admin/categories/sub-categories/${id}`,
    payload
  );
  return data;
};

export const getOrders = async (page, search) => {
  const { data } = await http.get(
    `/admin/orders?search=${search}&page=${page}`
  );
  return data;
};
export const getSingleOrder = async (id) => {
  const { data } = await http.get(`/admin/orders/${id}`);
  return data;
};
export const deleteOrder = async (id) => {
  const { data } = await http.delete(`/admin/orders/${id}`);
  return data;
};
export const updateOrderStatus = async ({ id, ...payload }) => {
  const { data } = await http.put(`/admin/orders/${id}`, payload);
  return data;
};
export const dashboardData = async () => {
  const { data } = await http.get("/admin/dashboard");
  return data;
};
export const login = async (payload) => {
  const { data } = await http.post("/admin/auth/login", payload);
  return data;
};
export const register = async (payload) => {
  const { data } = await http.post(`/admin/auth/register`, payload);
  return data;
};
export const getProfile = async () => {
  const { data } = await http.get("/admin/profile");
  return data;
};
export const updateProfile = async (payload) => {
  const { data } = await http.put("/admin/profile", payload);
  return data;
};

export const deteleFiles = async (payload) => {
  const { data } = await http.post("/admin/delete", payload);
  return data;
};
export const singleDeleteFile = async (payload) => {
  const { data } = await http.delete(`/admin/delete`, { data: payload });
  return data;
};
export const selectCurrency = async (payload) => {
  const { data } = await http.put("admin/users/select-currency", payload);
  return data;
};
export const changePassword = async (payload) => {
  const { data } = await http.put("/admin/users/change-password", payload);
  return data;
};
export const forgetPassword = async (payload) => {
  const { data } = await http.post("/admin/auth/forget-password", {
    email: payload,
  });
  return data;
};
export const resetPassword = async ({ newPassword, token }) => {
  const { data } = await http.post("/admin/auth/reset-password", {
    newPassword: newPassword,
    token: token,
  });
  return data;
};
export const getNotification = async (page) => {
  const { data } = await http.get(`/admin/notifications?page=${page}`, {});
  return data;
};
export const getUserNotification = async () => {
  const { data } = await http.get(`/admin/notifications/user?page=${1}`);
  return data;
};
export const addUserNotification = async (payload) => {
  const { data } = await http.post(`/admin/notifications/user`, payload);
  return data;
};
export const editUserNotification = async (payload) => {
  const { data } = await http.put(`/admin/notifications/user`, payload);
  return data;
};
export const deleteUserNotification = async (id) => {
  const { data } = await http.delete(`/admin/notifications/user?id=${id}`);
  return data;
};
export const getNewsletter = async (page) => {
  const { data } = await http.get(`/admin/newsletter?page=${page}`);
  return data;
};
export const getRoles = async () => {
  const { data: response } = await http.get(`/admin/roles`);
  return response;
};
export const addRole = async (payload) => {
  const { data } = await http.post("/admin/roles", payload);
  return data;
};
export const deleteRole = async (id) => {
  const { data } = await http.delete(`/admin/roles/${id}`);
  return data;
};
export const getPrimarySlider = async () => {
  const { data: response } = await http.get(`/admin/home-slider`);
  return response;
};

export const createPrimarySlider = async (payload) => {
  const { data: response } = await http.post(`/admin/home-slider`, {
    ...payload,
    clientId: "123-123-124",
  });
  return response;
};

export const getPrimarySlide = async (id) => {
  const { data } = await http.get(`/admin/home-slider/${id}`);
  return data;
};

export const updatePrimarySlider = async ({ id, ...payload }) => {
  const { data } = await http.put(`/admin/home-slider/${id}`, payload);
  return data;
};

export const getHomeBanners = async () => {
  const { data } = await http.get(`/admin/home-banners`);
  return data;
};
export const updateHomeBanners = async (payload) => {
  const { data } = await http.post(`/admin/home-banners`, payload);
  return data;
};

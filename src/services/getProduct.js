import http from "./httpService";

export const getSingleProduct = (id) => {
  return http.get(`/product/${id}`);
};

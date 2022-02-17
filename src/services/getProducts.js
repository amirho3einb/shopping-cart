import http from "./httpService";

export const getAllProducts = (data) => {
  return http.get("/product", data);
};

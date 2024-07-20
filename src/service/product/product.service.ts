import axios from "axios";

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

const getAllProducts = async () => {
  const response = await axios.get(API_URL).catch((err) => {
    console.log(err);
  });

  return response;
};

const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`).catch((err) => {
    console.log(err);
  });
  return response;
};

export const productService = {
  getAllProducts,
  getProductById,
};

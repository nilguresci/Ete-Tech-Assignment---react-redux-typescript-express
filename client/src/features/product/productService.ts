import axios from "axios";
import { IProduct } from "./../../models/Product";

//const API_URL = "https://642d9c2266a20ec9cea2117f.mockapi.io/Products";
const API_URL = "http://localhost:3000/api/products";

const config = {
  headers: {
    "Content-Type": "application/json",
    //"Access-Control-Allow-Origin": "http://localhost:3000",
  },
};
//add product
const addProduct = async (productData: IProduct) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

//get products
const getProducts = async () => {
  const data = await axios.get(API_URL);

  return data.data;
};

const getOneProduct = async (id: string) => {
  const data = await axios.get(API_URL + "/" + id);
  return data.data;
};

// update product
const updateProduct = async (productData: IProduct) => {
  const response = await axios.put(API_URL + "/" + productData.id, productData);
  return response.data;
};

//delete product
const deleteProduct = async (id: string) => {
  const response = await axios.delete(API_URL + "/" + id);
  return response.data;
};

//get last 5 product
const getLastFiveProduct = async () => {
  const products = await getProducts();

  const fives = products.sort((a: number, b: number) => {
    return a - b;
  });

  return fives.slice(Math.max(fives.length - 6, 1));
};

const productService = {
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  getLastFiveProduct,
};

export default productService;

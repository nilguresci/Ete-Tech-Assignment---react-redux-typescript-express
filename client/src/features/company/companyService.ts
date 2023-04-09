import axios from "axios";
import { ICompany } from "./../../models/Company";

//const API_URL = "https://642d9f49bf8cbecdb40b124b.mockapi.io/Companies";
const API_URL = "http://localhost:3000/api/companies";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//get companies
const getCompanies = async () => {
  const data = await axios.get(API_URL, config);

  return data.data;
};

const getOneCompany = async (id: string) => {
  const data = await axios.get(API_URL + "/" + id, config);
  return data.data;
};

//add company
const addCompany = async (companyData: ICompany) => {
  const response = await axios.post(API_URL, companyData, config);
  return response.data;
};

// update company
const updateCompany = async (companyData: ICompany) => {
  const response = await axios.put(
    API_URL + "/" + companyData.id,
    companyData,
    config
  );
  return response.data;
};

//delete company
const deleteCompany = async (id: string) => {
  const response = await axios.delete(API_URL + "/" + id, config);

  return response.data;
};

//get last 5 company
const getLastFiveCompany = async () => {
  const companies = await getCompanies();
  return companies.slice(Math.max(companies.length - 6, 1));
};

const companyService = {
  getCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
  addCompany,
  getLastFiveCompany,
};

export default companyService;

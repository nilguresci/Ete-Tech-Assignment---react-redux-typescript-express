export interface IProduct {
  createdAt: string;
  productName: string;
  productCategory: string;
  productAmount: number;
  amountUnit: string;
  companyName: string;
  id: string;
}

export interface IProductList {
  products: IProduct[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

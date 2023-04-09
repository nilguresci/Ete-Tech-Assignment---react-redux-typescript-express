export interface ICompany {
  createdAt: string;
  companyName: string;
  companyLegalNumber: number;
  incorporationCountry: string;
  website: string;
  id: string;
}

export interface ICompanyList {
  companies: ICompany[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

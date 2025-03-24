interface CompanyItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  tel: string;
  email: string;
  website: string;
  description: string;
  picture?: string;
}

interface CompanyJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

interface BookingItem {
  name: string;
  tel: string;
  email: string;
  bookDate: string;
  companyName: string;
  companyId: string;
  userId: string;
}

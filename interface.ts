interface CompanyItem {
  _id: string;
  name: string;
  location: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  email: string;
  region: string;
  salary: string;
  website: string;
  description: string;
  image?: string;
}

interface CompanyJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

interface BookingItem {
  _id: string;
  bookingDate: string;
  company: {
    _id: string;
    name: string;
    website: string;
  };
  user: string;
}

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

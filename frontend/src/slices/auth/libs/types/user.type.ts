type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  group: { id: number; key: string; name: string };
  business: {
    id: number;
    taxNumber: string;
    companyName: string;
    ownerId: number;
  } | null;
};

export { type User };

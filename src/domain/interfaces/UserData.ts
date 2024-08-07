export interface UserData {
    email?: string;
    firstName: string;
    lastName: string;
    image: string;
    phone?: string;
    verifiedEmail?: boolean;
    id?: string;
    token?: string;
    address?: string;
    isAgreement?: boolean;
    products?: Array<{}>,
    companyKyc?: boolean,
    individualKyc?: boolean,
    createdAt?: string,
    userId?: string,
}
export type HeavyCargoFormType = {
    fullName: string;
    email: string;
    shipments: string;
    destination: string;
    weight: string;
};

export type IndexPageFormType = {
    totalWeight: number;
    length: number;
    breadth: number;
    height: number;
};

export type LoginDataFormType = {
    email: string;
    password: string;
}

export type SignupFormType = {
    name: string;
    email: string;
    password: string;
    cPassword: string;
    phone: string;
}

export type AddressPersonalInfoType = {
    fullName: string;
    email: string;
    phone: string;
    alternatePhone: string;
}

export type AddressType = {
    companyName: string;
    completeAddress: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;
}
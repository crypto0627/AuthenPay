export interface Chain {
    name: string;
    icon: string;
    balance: string;
    currency: string;
}

export interface Transaction_Form {
    method: "To" | "From";
    date: string;
    status: "Pending" | "Success" | "Failed";
    amount: string;
    ens: string;
}

export interface ChainItemProps {
    name: string;
    icon: string;
    balance: string;
    currency: string;
}

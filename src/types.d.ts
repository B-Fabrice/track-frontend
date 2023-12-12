import { Timestamp } from "firebase/firestore";

export interface Product {
    id: number;
    title: string;
    body_html: string;
    created_at: string;
    updated_at: string;
    variants: Variant[];
    images: Image[];
    image: Image;
}

interface Variant {
    id: number;
    product_id: number;
    title: string;
    price: string;
    created_at: string;
    updated_at: string;
}

interface PriceHistory {
    newPrice: string,
    previousPrice: string,
    productId: number
    updatedDate: Timestamp,
    variantId: number,
}
'use client';

import { createContext, useContext, useState } from 'react';
import { Product, Variant } from '@/types';

interface ProductContextType {
  products: Product[],
  isLoading: boolean,
  errorMessage: string,
  getProducts: Function,
  getProduct: Function,
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('undefined context provider');
  }
  return context;
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getProducts = async () => {
    try {
      await fetch('/api').then((value) => value.json()).then((data: any[]) => {
        const responseProducts: Product[] = [];
        
         for (const product of data) {
         if (product.image == null) continue;
          const imgUrl: string = product.image.src;
          const imagesUrl: string[] = product.images.map((e: any) => e.src);
          const newProduct: Product = {
            id: product.id,
            title: product.title,
            body_html: product.body_html,
            created_at: product.created_at,
            updated_at: product.updated_at,
            variants: product.variants as Variant[],
            images: imagesUrl,
            image: imgUrl,
          };
          responseProducts.push(newProduct);
        };
        setProducts(responseProducts.sort((b: Product, a: Product) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
        setIsLoading(false);
      });
    } catch {
      setIsLoading(false);
      setErrorMessage('');
    }

  };

  const getProduct = (id: number): Product | undefined => {
    const product = products.find(e => e.id == id);
    return product;
  };

  const data: ProductContextType = {
    products,
    isLoading,
    errorMessage,
    getProducts,
    getProduct
  };
  return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
}
"use client"

import Loader from "@/components/loader";
import { useProductContext } from "@/context";
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PriceHistory, Product, Variant } from "@/types";
import { db } from "@/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { formatDate } from "@/utils";
import VariantHistory from "@/components/variantHistory";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { getProducts, getProduct, isLoading } = useProductContext();
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);

  useEffect(() => {
    if (isLoading) {
      getProducts();
    }
  }, []);

  if (isLoading) return <Loader />;

  const product: Product = getProduct(parseInt(params.id) ?? 0);

  if (!product){
    return (
      <div className="h-screen w-screen gap-5 flex flex-col items-center justify-center">
        <p className="font-semibold text-2xl">No Product Found!</p>
        <Link href="/products">
          Back to Product Page
        </Link>
      </div>
    );
  }
  
  const querySnap = query(collection(db, 'priceHistory'), where('productId', '==', parseInt(params.id)));
  onSnapshot(querySnap, (snap) => {
    setPriceHistory(snap.docs.map(e => e.data()) as PriceHistory[]);
  });

  return (
    <div className="md-p-10 p-5">
      <div className="flex max-md:flex-col gap-4">
        <div className="flex-1">
          <Image src={product.image} width={700} height={900} alt={product.title}/>
        </div>
        <div className="flex-1 py-5">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="py-3">{product.body_html}</p>
          <div className="flex gap-2 text-sm">
                  <p className="font-semibold w-1/3">Created At:</p>
                  <p>{formatDate(product.created_at)}</p>
                </div>
                <div className="flex gap-2 text-sm">
                  <p className="font-semibold w-1/3">Last Updated:</p>
                  <p>{formatDate(product.updated_at)}</p>
                </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-bold text-center">Product Variants Price History</h2>
        {!priceHistory.length && <p className="py-10 text-center text-lg">No Price Change detected</p>}
        {priceHistory.length !== 0 && <div>
          <table className="table-auto">
            <thead className="border border-gray-100">
              <td className="p-2 font-semibold border border-gray-200">Variant Title</td>
              <td className="p-2 font-semibold border border-gray-200">Action</td>
            </thead>
            <tbody>
            {product.variants.map((variant: Variant, index: number) => {
            const variantPriceHistory = priceHistory.filter((e: PriceHistory) => e.variantId == variant.id);
            return <VariantHistory  history={variantPriceHistory.sort((b: PriceHistory, a: PriceHistory) => a.updatedDate.toDate().getTime() - b.updatedDate.toDate().getTime())} variant={variant} key={index}/>
          })}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}
"use client"

import Loader from "@/components/loader";
import { useProductContext } from "@/context";
import { Product } from "@/types";
import { useEffect } from "react";
import Image from "next/image";
import { formatDate } from "@/utils";
import Link from "next/link";

export default function Products() {
  const {getProducts, isLoading, products } = useProductContext();
  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="md-p-10 p-5">
      <h2 className="text-center py-5 font-bold text-2xl">Product list</h2>
      <p className="text-center">Click to any product to see its price update history</p>
      <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 md:gap-8">
        {products.map((e: Product, index: number) => (
          <Link key={index} href={`/products/${e.id}`}>
            <div key={index} className="bg-gray-100 pb-4 px-2 pt-2 rounded-3xl scale-95 hover:scale-100 transition ease-in-out delay-150">
              <Image 
                src={e.image}
                alt={e.title}
                width={400}
                height={500}
                className="w-full rounded-t-3xl object-container"
              />
              <div className="pt-5">
                <h2 className="font-semibold mb-2">{e.title}</h2>
                <div className="flex gap-2 text-sm">
                  <p className="font-semibold w-1/3">Created At:</p>
                  <p>{formatDate(e.created_at)}</p>
                </div>
                <div className="flex gap-2 text-sm">
                  <p className="font-semibold w-1/3">Last Updated:</p>
                  <p>{formatDate(e.updated_at)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
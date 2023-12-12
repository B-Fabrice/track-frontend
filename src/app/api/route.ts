import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response: any = await fetch(`${process.env.STORE_URL ?? ''}/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.ACCESS_TOKEN ?? '',
    }
  }).then(value => value.json()).then(data => {
    return data;
  });
  return NextResponse.json(response.products);
}
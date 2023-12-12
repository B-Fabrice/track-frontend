import Link from 'next/link'

export default function Home() {
  return (
    <main className="px-5 text-center flex items-center justify-center h-screen w-screen flex-col gap-5">
      <p className='font-bold text-xl'>Welcome to Shopify Product Price Change Track</p>
      <Link href='/products' className='text-lg'>Go to products</Link>
    </main>
  )
}

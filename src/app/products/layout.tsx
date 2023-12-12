import { ProductProvider } from '@/context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProductProvider>{children}</ProductProvider>
  )
}

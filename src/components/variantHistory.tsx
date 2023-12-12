import { PriceHistory, Variant } from "@/types";
import { formatDate } from "@/utils";
import { useState } from 'react';

export default function VariantHistory({ history, variant }: { history: PriceHistory[], variant: Variant }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <tr className="border border-gray-500 px-4 py-3">
      <td className="border border-gray-500 px-4 py-3">{variant.title}</td>
      <td className="border border-gray-500 px-4 py-3">
        <button className="" onClick={() => setIsVisible(true)}>View History</button>
        {isVisible && <div className="fixed w-screen h-screen flex items-center justify-center p-4 bg-black/10 inset-0">
          <div className="bg-white rounded-3xl p-10 w-full max-w-lg"> 
            <div className="cursor-pointer font-extrabold text-4xl w-fit mr-0 ml-auto" onClick={() => setIsVisible(false)}>&times;</div>
            <div className="mt-5">
              {history.length ?
                <table className="auto w-full">
                <thead className="border border-black">
                  <td className="w-1/2 px-4 py-2 text-start border border-black">Date</td>
                  <td className="w-1/2 px-4 py-2 text-start border border-black">Price</td>
                </thead>
                <tbody>
                  {history.map((e: PriceHistory, index: number) => (
                    <tr key={index} className="border border-gray-400">
                      <td className="border border-gray-500 px-2 py-1">{formatDate(e.updatedDate.toDate().toUTCString())}</td>
                      <td className="border border-gray-500 px-2 py-1">{e.newPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table> : <p>Variant has no change in price history</p>}
            </div>
          </div>
        </div>}
      </td>
    </tr>
  );

}

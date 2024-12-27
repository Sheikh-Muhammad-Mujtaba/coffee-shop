'use client'

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/UseCart/useCart';
import { CartItem } from '@/components/UseCart/useCart';
import { toast } from 'react-toastify'; 

async function getItem(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch item');
    }

    const items = await res.json();
    return items.find((item: any) => item.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<CartItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);
      const fetchedItem = await getItem(params.id);

      if (fetchedItem) {
        setItem({
          id: fetchedItem.id,
          image: fetchedItem.image,
          title: fetchedItem.title,
          price: fetchedItem.price,
          quantity: 1,
          rating: fetchedItem.rating,
          detail: fetchedItem.detail,
        });
      } else {
        setError('Item not found');
      }

      setIsLoading(false);
    };

    fetchItem();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin h-16 w-16 border-4 border-t-4 border-[#FF902B] rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12 text-xl text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!item) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(item); 
    toast.success(`${item.title} has been added to your cart!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
    });
  };

  return (
    <div className="bg-[#F6EBDA] min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Section */}
            <div className="relative rounded-xl overflow-hidden bg-[#F6EBDA]">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F2105]">
                {item.title}
              </h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-[#F6EBDA] px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-[#FF902B] fill-current" />
                  <span className="ml-1 text-[#2F2105] font-medium">
                    {item.rating}
                  </span>
                </div>
                <span className="text-2xl font-bold ml-4 text-[#2F2105]">
                  {item.price}K
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2 text-[#2F2105]">
                  Description
                </h2>
                <p className="text-gray-600">
                  {item.detail}
                </p>
              </div>

              <div className="mt-auto">
                <Button
                  className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-[#FF902B] hover:bg-[#e6811b] text-white transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

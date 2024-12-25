'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Item {
    id: number;
    image: string;
    title: string;
    detail: string;
    price: string;
    rating: number;
}

function Menu() {
    const [items, setItems] = useState<Item[]>([]);
    const [visibleItems, setVisibleItems] = useState<number>(6); // Default visible items

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
        getMenu();
    }, []);

    const handleShowMore = () => {
        setVisibleItems(items.length); // Show all items
    };

    const handleShowLess = () => {
        setVisibleItems(6); // Reset to 6 items
    };

    return (
        <div id='products' className='flex flex-col items-center justify-center mx-auto mt-[120px] px-[18px]'>
            <h1 className="text-[20px] sm:text-[24px] lg:text-[32px] font-semibold w-full">
                Special menu <span className="border-b-4 border-[#FF902B]">for you</span>
            </h1>

            <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-10 px-2 sm:px-6 lg:px-16">
                {items.slice(0, visibleItems).map((item) => (
                    <div
                        key={item.id}
                        className="relative w-full sm:w-[300px] md:w-[320px] lg:w-[355px] h-auto bg-white shadow-md flex flex-col justify-start items-center px-[18px] py-[24px] rounded-2xl"
                    >
                        <div className="absolute px-[10px] py-[6px] left-[30px] top-[30px] bg-white rounded-full flex justify-center items-center shadow-sm">
                            <p className="font-bold text-[12px] sm:text-[14px]">{item.rating} ⭐</p>
                        </div>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={500}
                            height={500}
                            className="w-full h-[200px] sm:h-[226px] object-cover rounded-2xl"
                        />
                        <div className="w-full p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <h2 className="text-[14px] sm:text-lg font-semibold">{item.title}</h2>
                                <p className="text-[12px] sm:text-lg font-semibold">{item.price} K</p>
                            </div>
                            <div className="flex justify-between items-center mt-2 gap-[25px]">
                                <p className='font-semibold text-[14px] text-black/60'>
                                    {item.detail}
                                </p>
                                <Link href={`/product-detail/menu/${item.id}`} className="bg-[#FF912B] rounded-full p-2 sm:p-3">
                                    <ShoppingCart className="h-5 sm:h-auto w-5 sm:w-[43px] text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More / Show Less Buttons */}
            <div className="mt-8">
                {visibleItems < items.length ? (
                    <button
                        onClick={handleShowMore}
                        className="px-6 py-3 bg-[#FF902B] text-white rounded-lg shadow-md hover:bg-[#e6811b]"
                    >
                        Show More
                    </button>
                ) : (
                    <button
                        onClick={handleShowLess}
                        className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
}

export default Menu;

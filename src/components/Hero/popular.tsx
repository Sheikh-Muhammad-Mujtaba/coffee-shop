'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: number;
    image: string;
    title: string;
    price: string;
    rating: number;
}

function Popular() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch('/api/popular');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        getProducts();
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center max-w-[1268px] bg-transparent mt-[-250px] md:mt-[-370px] z-10 mx-auto px-4 sm:px-8 lg:px-16">
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold w-full">
                Popular <span className="border-b-4 border-[#FF902B]">Now</span>
            </h1>
            <div className="w-full flex flex-wrap xl:flex-nowrap justify-center items-center gap-5 mt-10 px-2 sm:px-6 lg:px-16">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative w-full sm:w-[300px] md:w-[320px] lg:w-[355px] h-auto bg-white shadow-md flex flex-col justify-start items-center px-[18px] py-[24px] rounded-2xl"
                    >
                        <div className="absolute px-[10px] py-[6px] left-[30px] top-[30px] bg-white rounded-full flex justify-center items-center shadow-sm">
                            <p className="font-bold text-[12px] sm:text-[14px]">{product.rating} ⭐</p>
                        </div>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="w-full h-[200px] sm:h-[226px] object-cover rounded-2xl"
                        />
                        <div className="w-full p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <h2 className="text-[14px] sm:text-lg font-semibold">{product.title}</h2>
                                <p className="text-[12px] sm:text-lg font-semibold">{product.price} K</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2 sm:gap-[24px]">
                                    <button className="box-border border-[2px] border-[solid] border-[#FF912B] rounded-[8px] px-[12px] sm:px-[17px] py-[2px] sm:py-[4px] text-[#FF912B] font-semibold text-[12px] sm:text-[16px]">
                                        Hot
                                    </button>
                                    <button className="box-border border-[2px] border-[solid] border-[#FF912B] rounded-[8px] px-[12px] sm:px-[17px] py-[2px] sm:py-[4px] text-[#FF912B] font-semibold text-[12px] sm:text-[16px]">
                                        Cold
                                    </button>
                                </div>
                                <Link href={`/product-detail/popular/${product.id}`} className="bg-[#FF912B] rounded-full p-2 sm:p-3">
                                    <ShoppingCart className="h-5 sm:h-auto w-5 sm:w-[43px] text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <svg
                width="1268"
                height="364"
                viewBox="0 0 1268 364"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-full h-auto top-[300px] sm:top-[200px] -z-10 hidden xl:flex"
            >
                <path
                    d="M0 64.9359C0 28.0895 31.0343 -1.14672 67.8151 1.04973L1207.82 69.1273C1241.62 71.146 1268 99.149 1268 133.014V300C1268 335.346 1239.35 364 1204 364H64C28.6538 364 0 335.346 0 300V64.9359Z"
                    fill="#F9D9AA"
                />
            </svg>
        </div>
    );
}

export default Popular;

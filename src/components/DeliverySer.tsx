import React from 'react'
import Image from 'next/image';

function DeliveryService() {
    return (
        <div id='delivery' className='flex flex-col items-center justify-center mt-[120px] px-4 sm:px-6 max-w-[1268px] mx-auto'>
            <h1 className="text-[20px] sm:text-[24px] lg:text-[32px] font-semibold w-full">
                How to use delivery <span className="border-b-4 border-[#FF902B]">service</span>
            </h1>
            <div className='w-full flex flex-wrap items-center justify-center lg:justify-between gap-8 sm:gap-10 mt-8 px-2'>
                {/* Step 1 */}
                <div className='flex flex-col items-center justify-center gap-4 max-w-[300px]'>
                    <Image src={"/images/deliveryser/coffee.png"} alt="coffee" width={500} height={500}
                        className="w-[120px] sm:w-[140px] lg:w-[159px] h-auto object-cover" />
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='font-semibold text-[18px] sm:text-[20px] lg:text-[24px]'>
                            Choose your coffee
                        </h1>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px]'>
                            There are 20+ coffees for you
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className='flex flex-col items-center justify-center gap-4 max-w-[300px]'>
                    <Image src={"/images/deliveryser/van.png"} alt="coffee van" width={500} height={500}
                        className="w-[120px] sm:w-[140px] lg:w-[159px] h-auto object-cover" />
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='font-semibold text-[18px] sm:text-[20px] lg:text-[24px]'>
                            We deliver it to you
                        </h1>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px]'>
                            Choose delivery service
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className='flex flex-col items-center justify-center gap-4 max-w-[300px]'>
                    <Image src={"/images/deliveryser/coffee.png"} alt="coffee" width={500} height={500}
                        className="w-[120px] sm:w-[140px] lg:w-[159px] h-auto object-cover" />
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='font-semibold text-[18px] sm:text-[20px] lg:text-[24px]'>
                            Enjoy your coffee
                        </h1>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px]'>
                            Delivered fresh and fast
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryService;

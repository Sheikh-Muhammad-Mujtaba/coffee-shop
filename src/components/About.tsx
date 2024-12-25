import React from 'react'
import Image from 'next/image';

function About() {
    return (
        <div id='about' className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-[160px] w-full bg-[url('/images/about/bg.png')] bg-cover bg-center mt-[120px] sm:mt-[160px] lg:mt-[208px] px-4 sm:px-6">
            <Image
                src={'/images/about/image.png'}
                alt="coffee"
                width={1920}
                height={1080}
                className='relative top-[-62px] w-[200px] sm:w-[280px] lg:w-[359.13px] h-auto border-4 border-white rounded-2xl'
            />
            <div className='flex flex-col items-center md:items-start justify-center w-full sm:w-[478px] gap-4 sm:gap-6 text-center md:text-left'>
                <h1 className='font-semibold text-[20px] sm:text-[24px] lg:text-[32px] '>
                    About <span className='border-b-4 border-[#FF902B]'>us</span>
                </h1>
                <p className='font-semibold text-[16px] sm:text-[20px] lg:text-[24px] '>
                    We provide quality coffee, and are ready to deliver.
                </p>
                <p className='text-[#7E7D7A] text-[14px] sm:text-[16px] lg:text-[18px] '>
                    We are a company that makes and distributes delicious drinks. Our main product is made with a secret recipe and available in stores worldwide.
                </p>
                <button className='bg-[#2F2105] rounded-full px-6 sm:px-[24px] py-2 sm:py-[10px] text-[#F4AE26] font-bold text-[12px] sm:text-[14px]'>
                    Get your coffee
                </button>
            </div>
        </div>
    )
}

export default About;

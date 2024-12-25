import * as React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const baseButtonStyles =
    'flex gap-2.5 justify-center items-center px-8 py-3 text-sm font-semibold rounded-[33px] max-md:px-5';
  const variantStyles = {
    primary: 'shadow-lg bg-yellow-950 text-white',
    secondary: 'text-amber-400 text-xs font-bold',
  };

  return (
    <div className="bg-orange-100 w-full min-h-[1004px] xl:max-h-[1004px] flex flex-col items-center p-6 md:p-12 justify-start relative">

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center mt-[82px] w-full px-6">
        {/* Text Section */}
        <div className="md:w-1/2 max-w-lg flex flex-col gap-6 z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Enjoy your <span className="text-orange-400">coffee</span> before your activity
          </h1>
          <p className="text-lg text-neutral-500">
            Boost your productivity and build your mood with a glass of coffee in the morning
          </p>
          <div className="flex gap-5 justify-center md:justify-start">
            <button className={`${baseButtonStyles} ${variantStyles.primary}`}>
              <span>Order now</span>
              <ShoppingCart />
            </button>
            <button className={`${baseButtonStyles} ${variantStyles.secondary}`}>
              <span>More menu</span>
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end z-10">
          <Image
            src="/images/hero.png"
            alt="Hero Section Image"
            width={526}
            height={416}
            className="object-contain w-[80%] md:w-[526px] h-auto"
          />
        </div>
      </div>

      {/* Background Coffee Beans */}
      <Image
        src={"/images/coffeebeans.png"}
        alt="Coffee beans"
        width={500}
        height={500}
        className="absolute top-0 right-0 w-[230px] md:w-full max-w-[599px] h-auto blur-sm"
      />
      <Image
        src={"/images/coffeebeans.png"}
        alt="Coffee beans"
        width={500}
        height={500}
        className="absolute bottom-0 left-0 w-[230px] md:w-full max-w-[599px] h-auto rotate-180 blur-sm"
      />
    </div>
  );
};

export default HeroSection;

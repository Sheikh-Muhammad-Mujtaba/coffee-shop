'use client'

import { useCart } from '@/components/UseCart/useCart'
import { CartItem } from '@/components/UseCart/cart-item'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'react-toastify'

export default function CartPage() {
  const { cartItems, isLoading, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6EBDA] pt-[80px]">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6EBDA] pt-[80px]">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-[#2F2105] mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-[#FF902B] hover:bg-[#e6811b]">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    // Display success notification
    toast.success("Proceeding to checkout!", { position: "bottom-right" })

    // Clear cart after checkout
    clearCart()
  }

  return (
    <div className="min-h-screen bg-[#F6EBDA] pt-[80px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#2F2105]">Shopping Cart</h1>
            <Button
              variant="ghost"
              asChild
              className="text-[#2F2105] hover:text-[#FF902B]"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-[#2F2105]">Subtotal</span>
              <span className="text-2xl font-bold text-[#2F2105]">{getTotal().toFixed(1)}K</span>
            </div>
            <Button
              className="w-full bg-[#FF902B] hover:bg-[#e6811b] text-lg py-6"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

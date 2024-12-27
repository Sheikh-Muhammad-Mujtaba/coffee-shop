'use client'

import { useState, useEffect } from 'react'

export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: string;
  rating: number;
  detail?: string;
  quantity: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const items = localStorage.getItem('cartItems')
    if (items) {
      setCartItems(JSON.parse(items))
    }
    setIsLoading(false)
  }, [])

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cartItems]
    const existingItem = updatedCart.find((i) => i.id === item.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      updatedCart.push({ ...item, quantity: 1 })
    }

    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity)
    }, 0)
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItems')  
  }

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    clearCart,  
  }
}

'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-xl mb-8">We're sorry, but we encountered an error while loading the coffee product.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}


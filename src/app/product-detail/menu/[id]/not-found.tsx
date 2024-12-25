import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
      <p className="text-xl mb-8">Sorry, we couldn't find the coffee product you're looking for.</p>
      <Button asChild>
        <Link href="/">
          Return to Menu
        </Link>
      </Button>
    </div>
  )
}


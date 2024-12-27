import { POPULAR_PRODUCT } from "./data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get("id");
    if (id) {
      if (!/^\d+$/.test(id)) {
        return new Response(JSON.stringify({ message: "Invalid ID format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const product = POPULAR_PRODUCT.find((p) => p.id === parseInt(id, 10));
      if (product) {
        return new Response(JSON.stringify(product), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", 
          },
        });
      } else {
        return new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const search = searchParams.get("search");
    let results = POPULAR_PRODUCT;
    if (search) {
      const sanitizedSearch = search.trim().toLowerCase().replace(/[<>;'"(){}[\]]/g, "");
      results = POPULAR_PRODUCT.filter((item) =>
        item.title.toLowerCase().includes(sanitizedSearch)
      );
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", 
        "X-Content-Type-Options": "nosniff", 
      },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

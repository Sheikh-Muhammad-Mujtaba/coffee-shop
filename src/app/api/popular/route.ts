import { POPULAR_PRODUCT } from "./data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); 

  if (id) {
    const project = POPULAR_PRODUCT.find((b) => b.id === parseInt(id, 10)); 
    if (project) {
      return new Response(JSON.stringify(project), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify(POPULAR_PRODUCT), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
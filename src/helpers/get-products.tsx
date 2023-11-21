
export default async function getProducts({ id }: { id: string }) {
    const response = await fetch(
        "https://admin-dashboard-seven-bay.vercel.app/api/products"
      );
      const data = await response.json();
      const filteredData = data.message.filter((product: any) => product.id === parseInt(id));
      return filteredData
}


export default async function getProducts({ id}: { id?: string }) {
    const response = await fetch(
        "http://localhost:3000/api/product"
      );
      const data = await response.json();
      if(!id){
        return data.message

      }
      const filteredData = data.message.filter((product: any) => product.id === parseInt(id));
      return filteredData
}

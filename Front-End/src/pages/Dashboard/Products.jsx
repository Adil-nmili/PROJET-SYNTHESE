
import Headers from "../../components/Partials/Hearder";
import ProductsTable from "../../components/Partials/ProductsTable";



export default function ListProducts() {
 
  return (
    <div className="p-6  min-h-screen">
      <Headers title={"Products"} />
      <ProductsTable  />
    </div>
  );
}

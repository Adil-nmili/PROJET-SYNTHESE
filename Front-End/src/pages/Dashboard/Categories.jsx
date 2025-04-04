import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hearder from "../../components/Partials/Hearder";
import CategoriesTable from "../../components/Partials/CategoriesTable";
import { useEffect, useState } from "react";
import Categorie from "../../../service/Categorie";
import CategorieForm from "../../components/Partials/CategorieForm";

const Categories = () => {

  return (
    <div>
      <Hearder title={"Categories"} />
      <div className="lg:w-[600px] sm:w-full mx-auto">

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="create">Create new one</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" >
          <CategoriesTable  />
        </TabsContent>
        <TabsContent value="create">
          <CategorieForm />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Categories;

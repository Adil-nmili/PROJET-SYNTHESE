import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headers from "../../components/Partials/Hearder";
import SousCategoriesTable from "../../components/Partials/SousCategoriesTable";
import SousCategorieForm from "../../components/Partials/SousCategorieForm";
import { Loading } from "@/components/ui/loading";


const SousCategories = () => {
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  

  return (
    <div>
      <Headers title={"Sous-Catégories"} />
      <div className="lg:w-[600px] sm:w-full mx-auto">
        <Tabs defaultValue="sous-categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sous-categories">Sous-Catégories</TabsTrigger>
            <TabsTrigger value="create">Créer une nouvelle</TabsTrigger>
          </TabsList>
          <TabsContent value="sous-categories">
            <SousCategoriesTable />
          </TabsContent>
          <TabsContent value="create">
            <SousCategorieForm />
          </TabsContent>
        </Tabs>
      </div>
      
    </div>
  );
};

export default SousCategories;

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headers from "../../components/Partials/Hearder";
import CategoriesTable from "../../components/Partials/CategoriesTable";
import CategorieForm from "../../components/Partials/CategorieForm";
import { Loading } from "@/components/ui/loading";

const Categories = () => {
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
      <Headers title={"Categories"} />
      <div className="lg:w-[600px] sm:w-full mx-auto">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="create">Create new one</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <CategoriesTable />
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

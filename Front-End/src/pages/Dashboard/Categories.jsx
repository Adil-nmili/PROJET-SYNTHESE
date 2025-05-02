import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headers from "@/components/Partials/Hearder";
import CategoriesTable from "@/components/Partials/CategoriesTable";
import CategorieForm from "@/components/Partials/CategorieForm";
import Loading from "../../components/Partials/loading";

const Categories = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div>
      <Headers title={"Categories"} />
      <div className="lg:w-[600px] sm:w-full mx-auto bg-white p-4 rounded-md dark:bg-slate-950 dark:border-slate-700 border-slate-300 border-1 shadow-md ">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="create">Create new one</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            {loading ? (
              <Loading />
            ) : (
              <CategoriesTable />
            )}
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

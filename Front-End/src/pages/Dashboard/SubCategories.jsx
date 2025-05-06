import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headers from "@/components/Partials/Hearder";
import SubCategoriesTable from "@/components/Partials/SubCategoriesTable";
import SubCategoryForm from "@/components/Partials/SubCategoryForm";
import Loading from "../../components/Partials/loading";
import Categorie from "../../../service/Categorie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const SubCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    Categorie.getAll().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Headers title={"Sub-categories"} />
      <div className="lg:w-[700px] sm:w-full mx-auto bg-white p-4 rounded-md dark:bg-slate-950 dark:border-slate-700 border-slate-300 border shadow-md">
        {/* Category Filter */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Filter by Category:</label>

          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)} // keep value as string
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((categorie) => (
                  <SelectItem
                    key={categorie.id}
                    value={categorie.id.toString()} // ensure value is string
                  >
                    {categorie.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="sub-categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sub-categories">Sub-categories</TabsTrigger>
            <TabsTrigger value="create">Create new one</TabsTrigger>
          </TabsList>
          <TabsContent value="sub-categories">
            {loading ? (
              <Loading />
            ) : (
              <SubCategoriesTable selectedCategory={Number(selectedCategory)} />
            )}
          </TabsContent>
          <TabsContent value="create">
            <SubCategoryForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubCategories;

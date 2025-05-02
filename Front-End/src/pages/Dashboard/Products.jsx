import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Headers from "../../components/Partials/Hearder";
import ProductsTable from "../../components/Partials/ProductsTable";

export default function ListProducts() {
  
  return (
    <div className="p-6 min-h-screen ">
      <ProductsTable />
    </div>
  );
}

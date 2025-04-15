<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create([
            'product_code' => 1001,
            'name' => 'Classic White T-Shirt',
            'description' => 'A comfortable basic white t-shirt',
            'price' => 19.99,
            'quantity' => 100,
            'category_id' => 1,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['White', 'Black', 'Gray']),
            'images' => json_encode(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1002,
            'name' => 'Slim Fit Jeans',
            'description' => 'Modern slim fit denim jeans',
            'price' => 49.99,
            'quantity' => 75,
            'category_id' => 2,
            'sizes' => json_encode(['30', '32', '34', '36']),
            'colors' => json_encode(['Blue', 'Black']),
            'images' => json_encode(['https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1003,
            'name' => 'Running Shoes',
            'description' => 'Lightweight athletic running shoes',
            'price' => 89.99,
            'quantity' => 50,
            'category_id' => 3,
            'sizes' => json_encode(['7', '8', '9', '10', '11']),
            'colors' => json_encode(['Black/Red', 'Gray/Blue']),
            'images' => json_encode(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1004,
            'name' => 'Leather Jacket',
            'description' => 'Classic leather motorcycle jacket',
            'price' => 199.99,
            'quantity' => 25,
            'category_id' => 4,
            'sizes' => json_encode(['S', 'M', 'L']),
            'colors' => json_encode(['Black', 'Brown']),
            'images' => json_encode(['https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1005,
            'name' => 'Summer Dress',
            'description' => 'Floral print summer dress',
            'price' => 39.99,
            'quantity' => 60,
            'category_id' => 5,
            'sizes' => json_encode(['XS', 'S', 'M', 'L']),
            'colors' => json_encode(['Blue Floral', 'Pink Floral']),
            'images' => json_encode(['https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1006,
            'name' => 'Hooded Sweatshirt',
            'description' => 'Comfortable cotton blend hoodie',
            'price' => 44.99,
            'quantity' => 85,
            'category_id' => 1,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Gray', 'Navy', 'Black']),
            'images' => json_encode(['https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1007,
            'name' => 'Cargo Pants',
            'description' => 'Multi-pocket cargo pants',
            'price' => 54.99,
            'quantity' => 45,
            'category_id' => 2,
            'sizes' => json_encode(['30', '32', '34', '36']),
            'colors' => json_encode(['Khaki', 'Olive', 'Black']),
            'images' => json_encode(['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1008,
            'name' => 'Canvas Sneakers',
            'description' => 'Classic canvas sneakers',
            'price' => 34.99,
            'quantity' => 90,
            'category_id' => 3,
            'sizes' => json_encode(['7', '8', '9', '10', '11']),
            'colors' => json_encode(['White', 'Black', 'Navy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1009,
            'name' => 'Winter Coat',
            'description' => 'Warm winter parka with fur hood',
            'price' => 149.99,
            'quantity' => 35,
            'category_id' => 4,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Black', 'Navy', 'Olive']),
            'images' => json_encode(['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1010,
            'name' => 'Maxi Skirt',
            'description' => 'Flowing maxi skirt',
            'price' => 49.99,
            'quantity' => 40,
            'category_id' => 5,
            'sizes' => json_encode(['XS', 'S', 'M', 'L']),
            'colors' => json_encode(['Black', 'Navy', 'Burgundy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1011,
            'name' => 'Polo Shirt',
            'description' => 'Classic fit polo shirt',
            'price' => 29.99,
            'quantity' => 70,
            'category_id' => 1,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['White', 'Navy', 'Red']),
            'images' => json_encode(['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1012,
            'name' => 'Chino Shorts',
            'description' => 'Casual chino shorts',
            'price' => 34.99,
            'quantity' => 55,
            'category_id' => 2,
            'sizes' => json_encode(['30', '32', '34', '36']),
            'colors' => json_encode(['Khaki', 'Navy', 'Gray']),
            'images' => json_encode(['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1013,
            'name' => 'Hiking Boots',
            'description' => 'Waterproof hiking boots',
            'price' => 119.99,
            'quantity' => 30,
            'category_id' => 3,
            'sizes' => json_encode(['8', '9', '10', '11', '12']),
            'colors' => json_encode(['Brown', 'Black']),
            'images' => json_encode(['https://images.unsplash.com/photo-1520219306100-9edf8f5e9c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1014,
            'name' => 'Denim Jacket',
            'description' => 'Classic denim jacket',
            'price' => 69.99,
            'quantity' => 45,
            'category_id' => 4,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Blue', 'Black']),
            'images' => json_encode(['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1015,
            'name' => 'Pencil Skirt',
            'description' => 'Professional pencil skirt',
            'price' => 44.99,
            'quantity' => 50,
            'category_id' => 5,
            'sizes' => json_encode(['XS', 'S', 'M', 'L']),
            'colors' => json_encode(['Black', 'Navy', 'Gray']),
            'images' => json_encode(['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1016,
            'name' => 'V-Neck Sweater',
            'description' => 'Soft wool blend v-neck sweater',
            'price' => 59.99,
            'quantity' => 65,
            'category_id' => 1,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Gray', 'Navy', 'Burgundy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1017,
            'name' => 'Dress Pants',
            'description' => 'Formal dress pants',
            'price' => 79.99,
            'quantity' => 40,
            'category_id' => 2,
            'sizes' => json_encode(['30', '32', '34', '36']),
            'colors' => json_encode(['Black', 'Gray', 'Navy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1018,
            'name' => 'Dress Shoes',
            'description' => 'Classic leather dress shoes',
            'price' => 129.99,
            'quantity' => 35,
            'category_id' => 3,
            'sizes' => json_encode(['8', '9', '10', '11', '12']),
            'colors' => json_encode(['Black', 'Brown']),
            'images' => json_encode(['https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1019,
            'name' => 'Blazer',
            'description' => 'Professional fitted blazer',
            'price' => 109.99,
            'quantity' => 30,
            'category_id' => 4,
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Black', 'Navy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);

        \App\Models\Product::create([
            'product_code' => 1020,
            'name' => 'Wrap Dress',
            'description' => 'Elegant wrap dress',
            'price' => 69.99,
            'quantity' => 45,
            'category_id' => 5,
            'sizes' => json_encode(['XS', 'S', 'M', 'L']),
            'colors' => json_encode(['Black', 'Red', 'Navy']),
            'images' => json_encode(['https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'])
        ]);
    }
}

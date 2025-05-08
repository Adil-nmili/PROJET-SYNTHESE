<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insérer des produits fictifs
        // DB::table('products')->insert([
            $products = [
            
            [
                'product_code' => 'P001',
                'name' => 'LeBron James Los Angeles Lakers Icon Edition 2023-24 Player Tee',
                'description' => "LeBron James Los Angeles Lakers Icon Edition
                Men's Nike NBA T-Shirt
                Rep your favorite player in the Los Angeles Lakers T-Shirt. Inspired by the jersey, it displays bold name and number graphics on a casual favorite.",
                'price' => 40.00,
                'quantity' => 100,
                'category_id' => 1, // Assurez-vous que l'ID de catégorie existe
                'sousCategorie_id' => 1, // Assurez-vous que l'ID de sous-catégorie existe
                'sizes' => '["S", "M", "L"]',
                'colors' => '["Rouge", "Bleu"]',
                'images' => '["https://lakersstore.com/cdn/shop/files/AURORA_DR6380-734_PHSBH001-2000.jpg?v=1697134448&width=540", "https://lakersstore.com/cdn/shop/files/AURORA_DR6380-734_PHSFH001-2000.jpg?v=1697134454&width=1080"]',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            [
                'product_code' => 'P002',
                'name' => "Los Angeles Lakers LeBron James Statement Edition Player T-Shirt",
                'description' => "LeBron James Los Angeles Lakers Icon Edition
                Men's Nike NBA T-Shirt
                Rep your favorite player in the Los Angeles Lakers T-Shirt. Inspired by the jersey, it displays bold name and number graphics on a casual favorite.",
                'price' => 49.99,
                'quantity' => 50,
                'category_id' => 1,
                'sousCategorie_id' => 1,
                'sizes' => '["M", "L"]',
                'colors' => '["Vert", "Noir"]',
                'images' => '["https://lakersstore.com/cdn/shop/products/AR4887-557-a_0304874e-be4d-4a37-be3f-cac4204a3484.png?v=1611786251&width=1080", "https://lakersstore.com/cdn/shop/products/AR4887-557-b_53ab2455-5e64-4e28-97c7-6b9a9f8abda9.png?v=1611786254&width=1800"]',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            [
                 'product_code' => 'P003',
                 'name' => 'Los Angeles Lakers LeBron James Association Edition Player T-Shirt',
                 'description' => "LeBron James Los Angeles Lakers Icon Edition
                 Men's Nike NBA T-Shirt
                 Rep your favorite player in the Los Angeles Lakers T-Shirt. Inspired by the jersey, it displays bold name and number graphics on a casual favorite.",
                 'price' => 50.00,
                 'quantity' => 50,
                 'category_id' => 1,
                 'sousCategorie_id' => 1,
                 'sizes' => '["M", "L"]',
                 'colors' => '["Vert", "Noir"]',
                 'images' => '["https://lakersstore.com/cdn/shop/products/AR4887-109-a_7b6985a3-fd51-4bef-a8c8-2c9f25cebf07.png?v=1611786257&width=1080", "https://lakersstore.com/cdn/shop/products/AR4887-109-b_838454a3-2868-4d51-9433-53e2a107f0ac.png?v=1611786260&width=1800"]',
                 'created_at' => now(),
                 'updated_at' => now(),
            ],
            
            [
                'product_code' => 'P004',
                'name' => 'Lakers Gasol NBA Career SS Tee',
                'description' => "Lakers Gasol NBA Career SS Tee .",
                'price' => 66.10,
                'quantity' => 100,
                'category_id' => 1,
                'sousCategorie_id' => 1,
                'sizes' => '["XL", "L"]',
                'colors' => '["Vert", "Noir"]',
                'images' => '["https://lakersstore.com/cdn/shop/products/PhotoRoom_20230303_194119.jpg?v=1678048660&width=1800", "https://lakersstore.com/cdn/shop/products/PhotoRoom_20230303_194149.jpg?v=1678048660&width=1800"]',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_code' => 'P005',
                'name' => 'Lakers Gasol NBA Career SS Tee',
                'description' => "Lakers Gasol NBA Career SS Tee .",
                'price' => 66.10,
                'quantity' => 100,
                'category_id' => 2,
                'sousCategorie_id' => 2,
                'sizes' => '["XL", "L"]',
                'colors' => '["Vert", "Noir"]',
                'images' => '["https://lakersstore.com/cdn/shop/products/PhotoRoom_20230303_194119.jpg?v=1678048660&width=1800", "https://lakersstore.com/cdn/shop/products/PhotoRoom_20230303_194149.jpg?v=1678048660&width=1800"]',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
          ];
          foreach ($products as $product) {
            DB::table('products')->updateOrInsert(
                ['product_code' => $product['product_code']],
                $product

        );
    }
}
}
<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;
// use Faker\Factory as Faker;

class CategorySeeder extends Seeder
{
    public function run()
    {
            Categorie::insert([
                [
                    'name' => 'Men',
                    
                    'description' => 'Clothing and accessories for men',
                    'image'=>'https://lakersstore.com/cdn/shop/products/DSC01253-Edit_1.jpg?v=1644518109&width=1080',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Women',
                    'description' => 'Clothing and accessories for women',
                    'image'=> 'https://lakersstore.com/cdn/shop/products/NB5963-LAKERS-MODEL.png?v=1572108935&width=1080',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Youth',
                    'description' => 'Trendy and cool items for youth',
                    'image'=> 'https://lakersstore.com/cdn/shop/files/Kids-Baby-Onesie-Heather-Gray_8a1211c4-b3e9-4c79-95c5-41d4ba020b2d.jpg?v=1741207419&width=540',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Accessories',
                    'description' => 'Various accessories for everyone',
                    'image'=> 'https://lakersstore.com/cdn/shop/files/109816.jpg?v=1697662107&width=540',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
}


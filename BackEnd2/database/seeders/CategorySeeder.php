<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'T-Shirts',
                'description' => 'Casual and comfortable t-shirts for everyday wear',
            ],
            [
                'name' => 'Pants',
                'description' => 'Jeans, trousers, and other bottom wear',
            ],
            [
                'name' => 'Shoes',
                'description' => 'Footwear for all occasions',
            ],
            [
                'name' => 'Jackets',
                'description' => 'Outerwear for various seasons',
            ],
            [
                'name' => 'Dresses',
                'description' => 'One-piece garments for women',
            ],
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }
    }
} 
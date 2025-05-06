<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;
use App\Models\SousCategorie;
use Faker\Factory as Faker;

class SousCategorySeeder extends Seeder
{
    public function run()
    {
        SousCategorie::insert([
            [ 'name' => 'Shirts', 'category_id' => 1 ],
            [ 'name' => 'Shorts & Pants', 'category_id' => 1 ],
            [ 'name' => 'Outerwear', 'category_id' => 1 ],
            [ 'name' => 'Shirts', 'category_id' => 2 ],
            [ 'name' => 'Shorts & Pants', 'category_id' => 2 ],
            [ 'name' => 'Outerwear', 'category_id' => 2 ],
            [ 'name' => 'Shirts', 'category_id' => 3 ],
            [ 'name' => 'Outerwear', 'category_id' => 3 ]
        ]);
    }
}

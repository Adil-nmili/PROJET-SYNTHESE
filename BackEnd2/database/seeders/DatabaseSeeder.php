<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use Database\Factories\ProductFactory;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        
        $this->call([
            // UserSeeder::class,
<<<<<<< HEAD
            ProductSeeder::class,
            CategorySeeder::class,
=======
            // CategorySeeder::class,
            // ProductSeeder::class,
            // SousCategorySeeder::class,
>>>>>>> main
            // OrderSeeder::class,
            // OrderItemSeeder::class,

        ]);
       
    }
}

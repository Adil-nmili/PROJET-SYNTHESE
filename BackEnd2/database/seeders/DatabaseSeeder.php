<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            // UserSeeder::class,
            ProductSeeder::class,
            CategorySeeder::class,
            // OrderSeeder::class,
            // OrderItemSeeder::class,

        ]);
    }
}

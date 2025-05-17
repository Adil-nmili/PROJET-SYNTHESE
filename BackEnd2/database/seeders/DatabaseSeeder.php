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
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            SousCategorySeeder::class,
            ProductSeeder::class,
            ClientSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
        ]);
    }
}

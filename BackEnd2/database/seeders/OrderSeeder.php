<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::all();
        $products = Product::all();

        if ($users->isEmpty() || $products->isEmpty()) {
            $this->command->error('Please seed users and products first!');
            return;
        }

        // Create 20 sample orders
        for ($i = 1; $i <= 20; $i++) {
            $user = $users->random();
            $status = $faker->randomElement(['waiting', 'delivered', 'returned']);
            $totalAmount = 0;

            // Create the order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => $status,
                'total_amount' => 0, // Will be updated after adding items
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now()
            ]);

            // Add 1-5 random products to the order
            $numItems = $faker->numberBetween(1, 5);
            for ($j = 0; $j < $numItems; $j++) {
                $product = $products->random();
                $quantity = $faker->numberBetween(1, 3);
                $price = $product->price;

                DB::table('order_items')->insert([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                $totalAmount += ($price * $quantity);
            }

            // Update the order's total amount
            $order->update(['total_amount' => $totalAmount]);

            $this->command->info("Created order #{$i} with {$numItems} items for user {$user->name}");
        }
    }
} 
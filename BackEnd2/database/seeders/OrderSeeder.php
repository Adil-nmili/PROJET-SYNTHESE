<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Client;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $clients = Client::all();
        $products = Product::all();

        if ($clients->isEmpty() || $products->isEmpty()) {
            $this->command->error('Please seed store users and products first!');
            return;
        }

        // Create 20 sample orders
        for ($i = 1; $i <= 20; $i++) {
            $client = $clients->random();
            $status = $faker->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);
            $totalAmount = 0;

            // Create the order
            $order = Order::create([
                'client_id' => $client->id,
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

            $this->command->info("Created order #{$i} with {$numItems} items for client {$client->first_name} {$client->last_name}");
        }
    }
} 
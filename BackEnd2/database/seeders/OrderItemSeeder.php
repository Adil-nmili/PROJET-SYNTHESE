<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;
use Faker\Factory as Faker;

class OrderItemSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Get all orders and products
        $orders = Order::all();
        $products = Product::all();
        
        if ($orders->isEmpty() || $products->isEmpty()) {
            $this->command->info('Please run the DatabaseSeeder first to create orders and products.');
            return;
        }
        
        // Create 20 order items
        for ($i = 0; $i < 20; $i++) {
            // Select a random order
            $order = $orders->random();
            
            // Select a random product
            $product = $products->random();
            
            // Determine quantity (1-5)
            $quantity = $faker->numberBetween(1, 5);
            
            // Calculate price
            $price = $product->price;
            
            // Create order item
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $price,
            ]);
            
            $this->command->info("Created order item for order #{$order->id} with product {$product->name} (quantity: {$quantity})");
            
            // Update order total amount
            $order->update([
                'total_amount' => $order->total_amount + ($price * $quantity)
            ]);
        }
    }
} 
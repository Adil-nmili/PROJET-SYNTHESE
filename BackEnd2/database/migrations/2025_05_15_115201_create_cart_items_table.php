<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->string('color')->nullable();
            $table->timestamps();

            $table->unique(['client_id', 'product_id']); // prevent duplicates
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};

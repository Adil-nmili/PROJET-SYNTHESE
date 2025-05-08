<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create carts table if it doesn't exist
        if (!Schema::hasTable('carts')) {
            Schema::create('carts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
                $table->string('session_id')->nullable()->index();
                $table->timestamps();
            });
        } else {
            // If carts table exists but doesn't have session_id, add it
            if (!Schema::hasColumn('carts', 'session_id')) {
                Schema::table('carts', function (Blueprint $table) {
                    $table->string('session_id')->nullable()->index()->after('user_id');
                });
            }
        }

        // Create cart_items table if it doesn't exist
        if (!Schema::hasTable('cart_items')) {
            Schema::create('cart_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('cart_id')->constrained()->onDelete('cascade');
                $table->foreignId('product_id')->constrained()->onDelete('cascade');
                $table->integer('quantity')->default(1);
                $table->string('selected_size')->nullable();
                $table->string('selected_color')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We don't want to accidentally drop existing tables
        // So we'll do nothing in the down method
    }
};
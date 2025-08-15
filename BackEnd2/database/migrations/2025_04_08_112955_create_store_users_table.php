<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('store_users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('matricule')->nullable();
            $table->string('phone')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('country');
            $table->string('postal_code');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['client'])->default('client'); // Store user role (client)
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_users');
    }
}

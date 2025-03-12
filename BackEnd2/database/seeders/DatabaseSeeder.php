<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
           
            'first_name' => 'Adil',
            'last_name' => 'Khan',
            'email' => 'adil@email.com',
            'matricule' => 'ADMIN001',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'phone' => '123456789',
            'address' => '1234 Main Street',
            'city' => 'New York',
            'country' => 'USA',
            'postal_code' => '10001',
        ]);    
    }
}

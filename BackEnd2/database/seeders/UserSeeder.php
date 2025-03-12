<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
                'name' => 'Adil Khan',
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

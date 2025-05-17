<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Create 10 sample clients
        for ($i = 1; $i <= 10; $i++) {
            Client::create([
                'first_name' => $faker->firstName(),
                'last_name' => $faker->lastName(),
                'email' => $faker->unique()->safeEmail(),
                'matricule' => $faker->unique()->numerify('CLI###'),
                'phone' => $faker->numerify('06########'),
                'address' => $faker->streetAddress(),
                'city' => $faker->city(),
                'country' => 'Morocco',
                'postal_code' => $faker->postcode(),
                'password' => Hash::make('password123'),
            ]);
        }

        $this->command->info('Created 10 sample clients');
    }
} 
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create 20 users
        for ($i = 0; $i < 20; $i++) {
            $firstName = $faker->firstName;
            $lastName = $faker->lastName;
            
            User::create([
                'name' => $firstName . ' ' . $lastName,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $faker->unique()->safeEmail,
                'matricule' => $faker->unique()->bothify('MAT-####-????'),
                'password' => Hash::make('password'),
                'phone' => $faker->phoneNumber,
                'address' => $faker->streetAddress,
                'city' => $faker->city,
                'country' => $faker->country,
                'postal_code' => $faker->postcode,
                'role' => $faker->randomElement(['admin', 'client']),
            ]);
            
            $this->command->info("Created user: {$firstName} {$lastName}");
        }
    }
}

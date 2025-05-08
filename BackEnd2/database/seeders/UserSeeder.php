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
        // $faker = Faker::create();

       
            
            User::create([
                'name' => 'Nouhaila EL ansari',
                'first_name' => 'Nouhaila',
                'last_name' => 'EL ansari',
                'email' => 'nouhaila@email.com',
                'matricule' => '123456',
                'password' => Hash::make('password'),
                'phone' => '1234567890',
                'address' => '123 Main St',
                'city' => 'Ankara',
                'country' => 'Turkey',
                'postal_code' => '12345',
                'role' => 'admin',
            ]);
            
            
        
    }
}

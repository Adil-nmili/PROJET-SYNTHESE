<?php

namespace Database\Seeders;
use app\Models\Admin;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder {
    public function run() {
        Admin::create([
            'name' => 'Adil',
            'email' => 'adil@email.com',
            'matricule' => 'ADMIN001',
            'password' => Hash::make('password123'),
        ]);
    }
}

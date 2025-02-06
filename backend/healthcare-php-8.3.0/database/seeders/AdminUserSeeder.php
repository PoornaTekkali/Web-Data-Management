<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create the default admin user
        User::create([
            'firstname' => 'Admin',
            'lastname' => '_',
            'email' => 'admin@gmail.com',
            'is_verified' => true,
            'is_active' => true,
            'role' => 'ADMIN', // Set the role to ADMIN
            'password' => bcrypt('password'), // Default password
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class HealthAdminUserSeeder extends Seeder
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
            'firstname' => 'HealthAdmin',
            'lastname' => '_',
            'email' => 'healthadmin@gmail.com',
            'is_verified' => true,
            'is_active' => true,
            'role' => 'HEALTHADMIN', // Set the role to ADMIN
            'password' => bcrypt('password'), // Default password
        ]);
    }
}

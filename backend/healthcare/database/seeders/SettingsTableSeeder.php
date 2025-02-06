<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if there are existing settings, if not, create default settings
        if (Setting::count() === 0) {
            Setting::create([
                'enableLogin' => true,
                'enableSignup' => true,
                'enablePatient' => true,
                'enableDoctor' => true,
                'enablePharmacist' => true,
                'enableAppointments' => true,
                'enableMessenger' => true,
                'enablePrescription' => true,
                'enableHealthRecords' => true,
                'enableMedicationHistory' => true,
                'enableMaintenance' => false,
                'enableHealthForums' => true,
                'tokenExpiration' => 60,
                'enableSupport'  => true,
            ]);
        }
    }
}

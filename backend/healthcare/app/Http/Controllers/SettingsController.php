<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingsController extends Controller
{

    public function update(Request $request)
    {
        $request->validate([
            'enableLogin' => 'required|boolean',
            'enableSignup' => 'required|boolean',
            'enablePatient' => 'required|boolean',
            'enableDoctor' => 'required|boolean',
            'enablePharmacist' => 'required|boolean',
            'enableAppointments' => 'required|boolean',
            'enableMessenger' => 'required|boolean',
            'enablePrescription' => 'required|boolean',
            'enableHealthRecords' => 'required|boolean',
            'enableMedicationHistory' => 'required|boolean',
            'enableMaintenance' => 'required|boolean',
            'tokenExpiration' => 'required|integer|min:1', // Adjust validation rules as needed
        ]);

        $settings = Setting::updateOrCreate(
            ['id' => 1], // Assuming id is the primary key
            $request->all()
        );

        return response()->json(['message' => 'Settings updated successfully', 'data' => $settings]);
    }

    public function get()
    {
        $settings = Setting::find(1); // Assuming id is the primary key

        if ($settings) {
            return response()->json(['message' => 'Settings retrieved successfully', 'data' => $settings]);
        } else {
            return response()->json(['message' => 'Settings not found'], 404);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicationHistory;

class MedicationHistoryController extends Controller
{
    public function storeFamilyHealthHistory(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'patient_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $request->patient_id,
            'date' => $request->date,
            'description' => $request->description,
            'type' => 'FAMILYHEALTH', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 201);
    }
    public function storeSurgeriesHistory(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'patient_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $request->patient_id,
            'date' => $request->date,
            'description' => $request->description,
            'type' => 'SURGEY', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 201);
    }
    public function storePastIllnessHistory(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'patient_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $request->patient_id,
            'date' => $request->date,
            'description' => $request->description,
            'type' => 'PASTILLNESS', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 201);
    }

    public function storeAllergiesHistory(Request $request)
    {


        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'description' => 'required|string',
        ]);

        $allegies= $request->allergies;
        $allegies_array = [];
            foreach ($allegies as $item) {
                $allegies_array[] = $item['name'];
        }
        $commaSeparatedallegies = implode(',', $names);

        $medicationHistory = MedicationHistory::create([
            'name' => 'Allergies',
            'patient_id' => $request->patient_id,
            'description' => $commaSeparatedallegies
            'type' => 'ALLERGIES', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 201);
    }


    public function getMedicationHistoryByUserandType($id, $type)
    {
        $medicationhistory = medicationhistory::where('user_id', $id )->where('type', $type)
        ->join('users', 'medication_histories.user_id', '=', 'users.id')
        ->select(
            'medication_histories.*',
            'users.firstname as user_firstname',
            'users.lastname as user_lastname',
            'users.email as user_email',
        )
        ->get();
        return response()->json($medicationhistory);
    }

    public function getAllergiesByUser($id)
    {
        $allergies = medicationhistory::where('user_id', $id )->where('type', 'ALLERGIES')->first();



        $allergyNames = explode(',', $allergies->description);
        $index = 0;
        $allergiesArray = [];
        foreach ($allergyNames as $allergyName) {
            $allergiesArray[] = [
                'name' => $allergyName,
                'index' => $index
            ];
            $index++;
        }



        return response()->json($allergiesArray);
    }
    
    public function destroy($id)
    {
        $medicationHistory = MedicationHistory::findOrFail($id);
        $medicationHistory->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

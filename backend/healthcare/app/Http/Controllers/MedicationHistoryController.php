<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicationHistory;
use App\Models\UserRecordsShareSettings;

class MedicationHistoryController extends Controller
{
    public function storeFamilyHealthHistory(Request $request)
    {
        $user = $request->user;
        $patientId = $request->has('user_id') ? $request->input('user_id') : $user->id;
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $patientId,
            'description' => $request->description,
            'type' => 'FAMILYHEALTH', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 200);
    }
    public function storeSurgeriesHistory(Request $request)
    {
        $user = $request->user;
        $patientId = $request->has('user_id') ? $request->input('user_id') : $user->id;
        $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $patientId,
            'date' => $request->date,
            'description' => $request->description,
            'type' => 'SURGERY', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 200);
    }
    public function storePastIllnessHistory(Request $request)
    {
        $user = $request->user;
        $patientId = $request->has('user_id') ? $request->input('user_id') : $user->id;
        $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'description' => 'required|string',
        ]);

        $medicationHistory = MedicationHistory::create([
            'name' => $request->name,
            'patient_id' => $patientId,
            'date' => $request->date,
            'description' => $request->description,
            'type' => 'PASTILLNESS', // Set the type directly here
        ]);

        return response()->json($medicationHistory, 200);
    }

    public function storeAllergiesHistory(Request $request)
    {

        $user = $request->user;
        $patientId = $request->has('user_id') ? $request->input('user_id') : $user->id;


        $medicationHistory = MedicationHistory::where('patient_id' , $patientId)->where('type' , 'ALLERGIES');
        $medicationHistory->delete();
        
        $request->validate([
            'allergies' => 'required',
        ]);

        $allegies= $request->allergies;
        $allegies_array = [];
            foreach ($allegies as $item) {
                $allegies_array[] = $item['name'];
        }
        $commaSeparatedallegies = implode(',', $allegies_array);

        $medicationHistory = MedicationHistory::create([
            'name' => 'Allergies',
            'patient_id' => $patientId,
            'description' => $commaSeparatedallegies,
            'type' => "ALLERGIES", // Set the type directly here
        ]);

        return response()->json($medicationHistory, 200);
    }


    public function getMedicationHistoryByUserandType(Request $request,$type,$id)
    {
        $medicationhistory = medicationhistory::where('patient_id', $id )->where('type', strtoupper($type))
        ->join('users', 'medication_histories.patient_id', '=', 'users.id')
        ->select(
            'medication_histories.*',
            'users.firstname as user_firstname',
            'users.lastname as user_lastname',
            'users.email as user_email',
        )
        ->get();
        return response()->json($medicationhistory);
    }

    public function getMedicationHistoryByAuthenticatedUserandType(Request $request, $type)
    {
        $user=$request->user;
        $medicationhistory = medicationhistory::where('patient_id', $user->id )->where('type', strtoupper($type))
        ->join('users', 'medication_histories.patient_id', '=', 'users.id')
        ->select(
            'medication_histories.*',
            'users.firstname as user_firstname',
            'users.lastname as user_lastname',
            'users.email as user_email',
        )
        ->get();
        return response()->json($medicationhistory);
    }



    public function getAllergiesByUser(Request $request)
    {
        $allergies = medicationhistory::where('patient_id', $id )->where('type', 'ALLERGIES')->first();



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


    public function getAllergiesByAuthenticatedUser(Request $request)
    {

        $user=$request->user;
        $allergies = medicationhistory::where('patient_id', $user->id )->where('type', 'ALLERGIES')->first();



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


public function getMedicalHistoryShareWithPatients(Request $request)
{
    $user = $request->user();
    $type = $request->input('type');
    $searchName = $request->input('name');

    // Retrieve share settings and medication history using a join operation
    $combinedData = UserRecordsShareSettings::where('user_records_share_settings.shared_user_id', $user->id)
                        ->join('users', 'user_records_share_settings.user_id', '=', 'users.id')
                        ->leftJoin('medication_histories', function ($join) use ($type) {
                            $join->on('medication_histories.patient_id', '=', 'users.id')
                                ->where('medication_histories.type', '=', $type);
                        })
                        ->when($searchName, function ($query) use ($searchName) {
                            $query->where(function ($subquery) use ($searchName) {
                                $subquery->where('users.firstname', 'like', '%' . $searchName . '%')
                                    ->orWhere('users.lastname', 'like', '%' . $searchName . '%');
                            });
                        })
                        ->select(
                            'user_records_share_settings.*',
                            'users.firstname',
                            'users.lastname',
                            'users.email',
                            'users.role',
                            'medication_histories.*'
                        )
                        ->get();

        if ($combinedData->isEmpty() || $combinedData->pluck('id')->contains(null)) {
        return response()->json([], 200);
    }

    return response()->json($combinedData, 200);
}



        public function getsharewithpatients(Request $request)
        {
        // Retrieve the authenticated user from the request
        $user = $request->user();

        $shareSettings = UserRecordsShareSettings::where('shared_user_id', $user->id)
                        ->join('users', 'user_records_share_settings.user_id', '=', 'users.id')
                        ->select('user_records_share_settings.*', 'users.firstname' , 'users.lastname' , 'users.email' , 'users.role')
                        ->get();

        // Return the share settings as a JSON response
        return response()->json($shareSettings, 200);
    }

}

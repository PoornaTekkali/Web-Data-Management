<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PrescriptionDispensation;

class PrescriptionDispensationController extends Controller
{
    public function store(Request $request)
    {
        $user= $request->user;
        $request->validate([
            'prescription_id' => 'required|exists:prescriptions,id',
        ]);

        // Create a new prescription dispensation
        $dispensation = PrescriptionDispensation::create([
            'status' => 'InTransit',
            'prescription_id' => $request->prescription_id,
            'pharmacist_id' => $user->id

        ]);


        return response()->json($dispensation, 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = $request->user;
        $prescription = PrescriptionDispensation::where('pharmacist_id',$user->id)->where('id',$id);

        $request->validate([
            'status' => 'string|in:Cancelled,InTransit,Delivered'
        ]);

        $prescription->update([
    'status' => $request->status // Update only the 'status' field
]);
        return response()->json($prescription, 200);
    }

     public function getForPatient(Request $request)
    {
        $user = $request->user;

        
        // Retrieve all prescription dispensations for the patient with details of prescriptions and pharmacists using join
        $dispensations = PrescriptionDispensation::join('prescriptions', 'prescription_dispensations.prescription_id', '=', 'prescriptions.id')
            ->join('users as pharmacists', 'prescription_dispensations.pharmacist_id', '=', 'pharmacists.id')
            ->where('prescriptions.id', $user->id)
            ->select('prescription_dispensations.*', 'prescriptions.*', 'pharmacists.firstname' ,'pharmacists.lastname' , 'prescription_dispensations.created_at', 'prescription_dispensations.status' , 'prescription_dispensations.id')
            ->get();

        return response()->json($dispensations, 200);
    }

public function getForPharmacist(Request $request)
{
    $user = $request->user;

    // Get the search query from the request
    $searchName = $request->input('name');

    // Retrieve all prescription dispensations handled by the pharmacist with details of prescriptions and patients using join
    $dispensations = PrescriptionDispensation::join('prescriptions', 'prescription_dispensations.prescription_id', '=', 'prescriptions.id')
        ->join('users as patients', 'prescriptions.user_id', '=', 'patients.id')
        ->where('prescription_dispensations.pharmacist_id', $user->id)
        ->when($searchName, function ($query) use ($searchName) {
            $query->where(function ($subquery) use ($searchName) {
                $subquery->where('patients.firstname', 'like', '%' . $searchName . '%')
                    ->orWhere('patients.lastname', 'like', '%' . $searchName . '%');
            });
        })
        ->select('prescription_dispensations.*', 'prescriptions.*', 'patients.firstname', 'patients.lastname', 'prescription_dispensations.created_at' , 'prescription_dispensations.status' , 'prescription_dispensations.id as order_id')
        ->get();

    return response()->json($dispensations, 200);
}

}

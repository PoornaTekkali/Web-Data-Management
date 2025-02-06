<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\PrescriptionDetail;
use App\Models\UserRecordsShareSettings;

class PrescriptionController extends Controller
{

    public function getByUser(Request $request)
    {
        $user = $request->user;
        $prescriptions = Prescription::where('user_id', $user->id)
            ->join('users', 'prescriptions.user_id', '=', 'users.id')
            ->select(
                'prescriptions.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($prescriptions);
    }

    public function getByDoctor(Request $request)
    {
        $user = $request->user;
        $searchName = $request->input('name');
        $prescriptions = Prescription::where('provider_id', $user->id)
            ->join('users', 'prescriptions.user_id', '=', 'users.id')
            ->when($searchName, function ($query) use ($searchName) {
                            $query->where(function ($subquery) use ($searchName) {
                                $subquery->where('users.firstname', 'like', '%' . $searchName . '%')
                                    ->orWhere('users.lastname', 'like', '%' . $searchName . '%');
                            });
                        })
            ->select(
                'prescriptions.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($prescriptions);
    }

    public function getPharmacistShared(Request $request)
    {
        $user = $request->user;
        $searchName = $request->input('name');

        $combinedData = UserRecordsShareSettings::where('user_records_share_settings.shared_user_id', $user->id)
        ->join('users', 'user_records_share_settings.user_id', '=', 'users.id')
        ->join('prescriptions', 'prescriptions.user_id', '=', 'users.id')
        ->leftJoin('users as providers', 'prescriptions.provider_id', '=', 'providers.id') // Join with users table again for provider details
        ->when($searchName, function ($query) use ($searchName) {
            $query->where(function ($subquery) use ($searchName) {
                $subquery->where('users.firstname', 'like', '%' . $searchName . '%')
                    ->orWhere('users.lastname', 'like', '%' . $searchName . '%');
            });
        })
        ->select(
            'users.firstname as user_firstname',
            'users.lastname as user_lastname',
            'users.email as user_email',
            'users.role as user_role',
            'providers.firstname as provider_firstname', // Select provider's firstname
            'providers.lastname as provider_lastname', // Select provider's lastname
            'prescriptions.*'
        )
        ->get();



        if ($combinedData->isEmpty() || $combinedData->pluck('id')->contains(null)) {
        return response()->json([], 200);
        }

        return response()->json($combinedData, 200);
    }

    public function getShared(Request $request)
    {
        $user = $request->user;
        $searchName = $request->input('name');

        $combinedData = UserRecordsShareSettings::where('user_records_share_settings.shared_user_id', $user->id)
                    ->join('users', 'user_records_share_settings.user_id', '=', 'users.id')
                    ->join('prescriptions', 'prescriptions.user_id', '=', 'users.id')
  
                    ->when($searchName, function ($query) use ($searchName) {
                        $query->where(function ($subquery) use ($searchName) {
                            $subquery->where('users.firstname', 'like', '%' . $searchName . '%')
                                ->orWhere('users.lastname', 'like', '%' . $searchName . '%');
                        });
                    })
                    ->select(
                        'users.firstname',
                        'users.lastname',
                        'users.email',
                        'users.role',
                        'prescriptions.*'
                    )
                    ->get();


        if ($combinedData->isEmpty() || $combinedData->pluck('id')->contains(null)) {
        return response()->json([], 200);
    }


        return response()->json($combinedData, 200);
    }

    public function store(Request $request)
    {
        $user = $request->user;
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'status' => 'string|in:Active,Inactive',

            'medication.*.name' => 'required|string',
            'medication.*.dosage' => 'required|string',
            'medication.*.time' => 'required|string'
        ]);


        try {
            DB::beginTransaction();

            $prescription = Prescription::create([
                    'user_id' => $request->user_id,
                    'description' => $request->description,
                    'status' => $request->status,
                    'provider_id' => $user->id
                ]);
                

            $prescriptionDetails = [];

            foreach ($request->medication as $detailData) {
                $prescriptionDetail = PrescriptionDetail::create([
                    'prescription_id' => $prescription->id,
                    'name' => $detailData['name'],
                    'dosage' => $detailData['dosage'],
                    'time' => $detailData['time']
                ]);
                
                $prescriptionDetails[] = $prescriptionDetail;
            }

            DB::commit();

            return response()->json($prescriptionDetails, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to store prescription details.'], 500);
        }
    }



    public function updateStatus(Request $request, $id)
    {
        $user = $request->user;
        $prescription = Prescription::where('user_id',$user->id)->where('id',$id);
        $request->validate([
            'status' => 'string|in:Active,Inactive'
        ]);

        $prescription->update([
    'status' => $request->status // Update only the 'status' field
]);
        return response()->json($prescription, 200);
    }


    public function destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();
        return response()->json(['message' => 'Prescription deleted successfully']);
    }
}

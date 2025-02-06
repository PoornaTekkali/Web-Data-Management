<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VitalSign;
use App\Models\UserRecordsShareSettings;

class VitalSignController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user;

        $request->validate([
            'bloodpressure' => 'required|string',
            'date' => 'required|date',
            'heartrate' => 'required|string',
            'bloodsugar' => 'required|string',
        ]);

        $vitalSign = VitalSign::create([
            'bloodpressure' => $request->bloodpressure,
            'date' =>  $request->date,
            'heartrate' => $request->heartrate,
            'bloodsugar' =>  $request->bloodsugar,
            'user_id' => $user->id
        ]);

        return response()->json($vitalSign, 200);
    }

    public function destroy($id)
    {
        $vitalSign = VitalSign::findOrFail($id);
        $vitalSign->delete();

        return response()->json(['message' => 'vitalSign data deleted successfully']);
    }

    public function getByUser(Request $request)
    {
        $user = $request->user;
        $vitalSigns = VitalSign::where('user_id', $user->id)
            ->join('users', 'vital_signs.user_id', '=', 'users.id')
            ->select(
                'vital_signs.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($vitalSigns);
    }

    public function getVitalSignsShareWithPatients(Request $request)
    {
    $user = $request->user();
    $type = $request->input('type');
    $searchName = $request->input('name');

    $combinedData = UserRecordsShareSettings::where('user_records_share_settings.shared_user_id', $user->id)
                        ->join('users', 'user_records_share_settings.user_id', '=', 'users.id')
                        ->leftJoin('vital_signs', function ($join) use ($type) {
                            $join->on('vital_signs.user_id', '=', 'users.id');
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
                            'vital_signs.*'
                        )
                        ->get();

        if ($combinedData->isEmpty() || $combinedData->pluck('id')->contains(null)) {
        return response()->json([], 200);
    }

    return response()->json($combinedData, 200);
    }
}

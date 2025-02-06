<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VitalSign;

class VitalSignController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'bloodpressure' => 'required|string',
            'index' => 'required|integer',
            'date' => 'required|date',
            'heartrate' => 'required|string',
            'bloodsugar' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $vitalSign = VitalSign::create($request->all());
        return response()->json($vitalSign, 201);
    }

    public function destroy($id)
    {
        $vitalSign = VitalSign::findOrFail($id);
        $vitalSign->delete();

        return response()->json(['message' => 'Exercise data deleted successfully']);
    }

    public function getByUser($UserId)
    {
        $vitalSigns = VitalSign::where('user_id', $id)
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
}

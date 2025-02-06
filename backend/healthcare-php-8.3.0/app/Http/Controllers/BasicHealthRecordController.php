<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BasicHealthRecord;

class BasicHealthRecordController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'height' => 'required|string',
            'weight' => 'required|string',
            'age' => 'required|string',
            'blood_group' => 'required|string',
        ]);

        $basicHealthRecord = BasicHealthRecord::create($request->all());
        return response()->json($basicHealthRecord, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'height' => 'required|string',
            'weight' => 'required|string',
            'age' => 'required|string',
            'blood_group' => 'required|string',
        ]);

        $basicHealthRecord = BasicHealthRecord::findOrFail($id);

        $basicHealthRecord->update($request->all());

        return response()->json($basicHealthRecord, 200);
    }


    public function getByUser($UserId)
    {
        $basicHealthRecord = BasicHealthRecord::where('user_id', $id)
            ->join('users', 'basic_health_records.user_id', '=', 'users.id')
            ->select(
                'basic_health_records.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($basicHealthRecord);
    }
    

}

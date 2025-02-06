<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BasicHealthRecord;

class BasicHealthRecordController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'height' => 'required|string',
            'weight' => 'required|string',
            'age' => 'required|string',
            'blood_group' => 'required|string',
        ]);

        $user = $request->user;

        $basicHealthRecord = basicHealthRecord::create([
            'height' => $request->height,
            'weight' => $request->weight,
            'age' => $request->age,
            'blood_group' => $request->blood_group,
            'user_id' => $user->id
        ]);

        return response()->json($basicHealthRecord, 200);
    }

    public function update(Request $request)
    {
        $user = $request->user;
        
        // Validate the incoming request data
        $request->validate([
            'height' => 'required|string',
            'weight' => 'required|string',
            'age' => 'required|string',
            'blood_group' => 'required|string',
        ]);

        // Retrieve the basic health record for the user
        $basicHealthRecord = BasicHealthRecord::where('user_id', $user->id)->first();

        // If the record doesn't exist, you may want to handle this case accordingly
        if (!$basicHealthRecord) {
            $this->store($request);
            return response()->json(['message' => 'New basic health record created', 'data' => $request->all() ], 200);

            //return response()->json(['error' => 'Basic health record not found'], 404);
        }

        // Update the record with the incoming request data
        $basicHealthRecord->update($request->all());

        // Optionally, you can return a response with the updated record
        return response()->json($basicHealthRecord, 200);
    }



    public function getByUser(Request $request)
    {
        $user = $request->user;
        $basicHealthRecord = BasicHealthRecord::where('user_id', $user->id)
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

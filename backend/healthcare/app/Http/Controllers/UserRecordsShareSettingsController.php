<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRecordsShareSettings;

class UserRecordsShareSettingsController extends Controller
{
    public function createsharewithuser(Request $request)
    {
        $user = $request->user;
        // Validate the incoming request data
        $validatedData = $request->validate([
            'shared_user_id' => 'required|integer',
            'role' => 'required|in:DOCTOR,PHARMACIST',
        ]);

        $shareSetting = UserRecordsShareSettings::create([
            'shared_user_id' => $validatedData['shared_user_id'],
            'role' => $validatedData['role'],
            'user_id' => $user->id,
        ]);

        // Return a response
        return response()->json($shareSetting, 200);
    }


    public function deletesharewithuser(Request $request)
    {
        // Retrieve the authenticated user from the request
        $user = $request->user();

        // Validate the incoming request data
        $validatedData = $request->validate([
            'shared_user_id' => 'required|integer',
        ]);

        // Delete share settings based on the authenticated user's ID and the shared user's ID
        UserRecordsShareSettings::where('user_id', $user->id)
            ->where('shared_user_id', $validatedData['shared_user_id'])
            ->delete();

        // Return a response
        return response()->json(['message' => 'Share settings deleted successfully'], 200);
    }


    public function getsharewithuser(Request $request)
        {
        // Retrieve the authenticated user from the request
        $user = $request->user();

    $shareSettings = UserRecordsShareSettings::where('user_id', $user->id)
                        ->join('users', 'user_records_share_settings.shared_user_id', '=', 'users.id')
                        ->select('user_records_share_settings.*', 'users.firstname' , 'users.lastname' , 'users.email' , 'users.role')
                        ->get();

        // Return the share settings as a JSON response
        return response()->json($shareSettings, 200);
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

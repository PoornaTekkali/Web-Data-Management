<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Support;

class SupportController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user;
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'severity' => 'required|string',
            'status' => 'required|string',
            'type' => 'required|string',
        ]);

        $support = Support::create([
            'title' => $request->title,
            'user_id' => $user->id,
            'description' => $request->description,
            'severity' => $request->severity,
            'status' => $request->status,
            'type' => $request->type,
        ]);


        return response()->json($support, 200);
    }

    public function getByUserType($id, $type)
    {
        $supports = Support::where('user_id', $id)->where('type', $type)
            ->join('users', 'supports.user_id', '=', 'users.id')
            ->select(
                'supports.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($supports);
    }

    public function getByType($type)
    {
        $supports = Support::where('type', $type)
            ->join('users', 'supports.user_id', '=', 'users.id')
            ->select(
                'supports.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($supports);
    }

    public function getByUser($id)
    {
        $supports = Support::where('user_id', $id)
            ->join('users', 'supports.user_id', '=', 'users.id')
            ->select(
                'supports.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($supports);
    }

    public function getAll()
    {
        $supports = Support::join('users', 'supports.user_id', '=', 'users.id')
            ->select(
                'supports.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($supports);
    }

    public function closeSupport($id)
    {
        $support = Support::find($id);

        // Check if user exists
        if (!$support) {
            return response()->json(['message' => 'Data not found.'], 404);
        }

        $support->status = 'Closed';

        $support->save();

        // Return a response indicating successful update
        return response()->json(['message' => 'Updated successfully.', 'support' => $support], 200);
    }
}



      
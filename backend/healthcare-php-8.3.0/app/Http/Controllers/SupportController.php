<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Support;

class SupportController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'severity' => 'required|string',
            'status' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string',
        ]);

        $support = Support::create($validatedData);

        return response()->json($support, 201);
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
}



      
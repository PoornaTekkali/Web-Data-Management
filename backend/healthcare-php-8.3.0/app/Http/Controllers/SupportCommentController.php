<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SupportComment;

class SupportCommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'support_id' => 'required|exists:supports,id',
            'message' => 'required|string',
        ]);

        $supportComment = SupportComment::create($request->all());

        return response()->json($supportComment, 201);
    }

    public function getBySupportId($id)
    {
        $supportComments = SupportComment::where('support_id', $id)
            ->with('user:id,firstname,lastname,email') // Eager load user details
            ->get();

        // $supportComments = SupportComment::where('support_id', $id)
        //     ->join('users', 'support_comments.user_id', '=', 'users.id')
        //     ->select(
        //         'support_comments.*',
        //         'users.firstname as user_firstname',
        //         'users.lastname as user_lastname',
        //         'users.email as user_email',
        //     )
        //     ->get();

        return response()->json($supportComments);
    }
}


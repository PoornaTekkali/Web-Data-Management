<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ForumPostAnswer;


class ForumPostAnswerController extends Controller
{


    public function getForumAnswersForPost($postId)
    {
        $forumAnswers = ForumPostAnswer::where('forum_id', $postId)
            ->join('users', 'forum_post_answers.user_id', '=', 'users.id')
            ->select(
                'forum_post_answers.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($forumAnswers);
    }


    public function store(Request $request)
    {
        $request->validate([
            'answer' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'forum_id' => 'required|exists:forum_posts,id' // Add validation for category field
        ]);

        $forumAnswer = ForumPostAnswer::create($request->only(['answer', 'user_id', 'forum_id']));

        return response()->json(['message' => 'Forum post Answer created successfully', 'post' => $forumAnswer], 201);
    }


}

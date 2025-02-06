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

        $user = $request->user;
        $userFullName = $user->firstname . ' ' . $user->lastname;

        $request->validate([
            'answer' => 'required|string',
            'forum_id' => 'required|exists:forum_posts,id' // Add validation for category field
        ]);


        // Create the forum answer with the user_id of the authenticated user
        $forumAnswer = ForumPostAnswer::create([
            'answer' => $request->answer,
            'user_id' => $user->id,
            'forum_id' => $request->forum_id,
        ]);

        $newForumAnswer = ForumPostAnswer::where('forum_post_answers.id' , $forumAnswer->id)
        ->join('users', 'forum_post_answers.user_id', '=', 'users.id')
            ->select(
                'forum_post_answers.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();

        return response()->json(['message' => 'Forum post Answer created successfully', 'post' => $newForumAnswer], 200);
    }


}

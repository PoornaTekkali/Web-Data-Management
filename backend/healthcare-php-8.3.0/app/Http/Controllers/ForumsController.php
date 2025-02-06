<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ForumPost;




class ForumsController extends Controller
{

    public function getAll()
    {
        $forumPosts = ForumPost::join('users', 'forum_posts.user_id', '=', 'users.id')
            ->select(
                'forum_posts.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email'
            )
            ->paginate(10);;


        return response()->json(['forumPosts' => $forumPosts]);
    }

    public function getForum($postId)
    {
        //$forumPost = ForumPost::findOrFail($postId);
        $forumPost = ForumPost::where('forum_posts.id', $postId)
            ->join('users', 'forum_posts.user_id', '=', 'users.id')
            ->select(
                'forum_posts.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();

        if (!$forumPost) {
            return response()->json(['message' => 'Forum post not found'], 404);
        }

        return response()->json($forumPost);
    }

    public function update(Request $request, $postId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string'
        ]);

        $forumPost = ForumPost::findOrFail($postId);
        $forumPost->update($request->only(['title', 'description', 'user_id', 'category']));

        return response()->json(['message' => 'Forum post updated successfully']);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string' // Add validation for category field
        ]);

        $forumPost = ForumPost::create($request->only(['title', 'description', 'user_id', 'category']));

        return response()->json(['message' => 'Forum post created successfully', 'post' => $forumPost], 201);
    }

    public function destroy($postId)
    {
        $forumPost = ForumPost::findOrFail($postId);
        $forumPost->delete();

        return response()->json(['message' => 'Forum post deleted successfully']);
    }
}

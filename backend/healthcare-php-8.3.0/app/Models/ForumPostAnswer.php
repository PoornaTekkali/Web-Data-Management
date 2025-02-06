<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumPostAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['forum_id', 'answer' ,'user_id'];

    public function forumPost()
    {
        return $this->belongsTo(ForumPost::class, 'forum_id');
    }

}

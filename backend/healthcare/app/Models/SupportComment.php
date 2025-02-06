<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportComment extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'support_id', 'message'];

    /**
     * Get the user that owns the support comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the support ticket associated with the comment.
     */
    public function support()
    {
        return $this->belongsTo(Support::class);
    }
}

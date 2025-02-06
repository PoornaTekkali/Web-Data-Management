<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicationReminders extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'prescription_details_id',
        'morning',
        'night',
        'afternoon'
    ];
}

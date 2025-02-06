<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

     protected $fillable = [
        'user_id',
        'dateofbirth',
        'gender',
        'qualification',
        'specialization',
        'licensenumber',
        'healthfacilityname',
        'about'

    ];
}

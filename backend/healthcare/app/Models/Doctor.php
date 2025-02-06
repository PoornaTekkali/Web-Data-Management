<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;
    protected $fillable = [ 'user_id',          
                'gender',
                'qualification',
                'facility_id',
                'specialization',
                'licensenumber',
                'about',
                'phoneNumber',
                'address',
                
            ];

}

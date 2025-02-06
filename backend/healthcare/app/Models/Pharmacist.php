<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pharmacist extends Model
{
    use HasFactory;
        protected $fillable = [ 'user_id',          
                'qualification',
                'facility_id',
                'licensenumber',
                'about',
                'phoneNumber',
                'address',
                
            ];
}

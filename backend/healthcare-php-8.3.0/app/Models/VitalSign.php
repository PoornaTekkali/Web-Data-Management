<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VitalSign extends Model
{
    use HasFactory;
    protected $fillable = ['bloodpressure', 'index', 'date', 'heartrate', 'bloodsugar', 'user_id'];

}

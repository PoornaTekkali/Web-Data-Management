<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'description', 'issued_date', 'provider_id', 'status'];

    public function details()
    {
        return $this->hasMany(PrescriptionDetail::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrescriptionDetail extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'dosage', 'time', 'prescription_id'];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }
}

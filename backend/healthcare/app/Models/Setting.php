<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $fillable = [
        'enableLogin',
        'enableSignup',
        'enablePatient',
        'enableDoctor',
        'enablePharmacist',
        'enableAppointments',
        'enableMessenger',
        'enablePrescription',
        'enableHealthRecords',
        'enableMedicationHistory',
        'enableMaintenance',
        'tokenExpiration',
        'enableHealthForums',
        'enableSupport'
    ];
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('enableLogin')->default(true);
            $table->boolean('enableSignup')->default(true);
            $table->boolean('enablePatient')->default(true);
            $table->boolean('enableDoctor')->default(true);
            $table->boolean('enablePharmacist')->default(true);
            $table->boolean('enableAppointments')->default(true);
            $table->boolean('enableMessenger')->default(true);
            $table->boolean('enablePrescription')->default(true);
            $table->boolean('enableHealthRecords')->default(true);
            $table->boolean('enableMedicationHistory')->default(true);
            $table->boolean('enableMaintenance')->default(false);
            $table->integer('tokenExpiration')->default(60); // seconds
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};

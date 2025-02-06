<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medication_histories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('patient_id');
            $table->date('date')->default(date('Y-m-d'));
            $table->text('description');
            $table->string('type');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('users')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medication_histories');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('prescription_dispensations', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['Delivered', 'InTransit' ,'Cancelled'])->default('InTransit');
            $table->unsignedBigInteger('prescription_id');
            $table->unsignedBigInteger('pharmacist_id');
            $table->timestamps();

            $table->foreign('prescription_id')->references('id')->on('prescriptions')->onDelete('cascade');
            $table->foreign('pharmacist_id')->references('id')->on('users')->onDelete('cascade');
        });
    }   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prescription_dispensations');
    }
};

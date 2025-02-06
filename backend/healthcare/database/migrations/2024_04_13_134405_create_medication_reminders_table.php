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
        Schema::create('medication_reminders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prescription_details_id');
            $table->unsignedBigInteger('user_id');
            $table->boolean('morning')->default(false);
            $table->boolean('afternoon')->default(false);
            $table->boolean('night')->default(false);
            


            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('prescription_details_id')->references('id')->on('prescription_details')->onDelete('cascade');
            $table->unique(['user_id', 'prescription_details_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medication_reminders');
    }
};

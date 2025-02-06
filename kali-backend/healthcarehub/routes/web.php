<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/token', function () {
    return csrf_token();
});

Route::get('/api/user',  [UserController::class, 'hello'])->name('user.hello')->middleware("auth.token");



//Route::get('/api/user', [UserController::class, 'user'])->name('user.login'); 
Route::post('/api/auth/login', [LoginController::class, 'login'])->name('login.userlogin'); 

Route::post('/api/auth/adminlogin', [LoginController::class, 'adminlogin'])->name('login.adminlogin'); 

Route::post('/api/register/doctor', [SignupController::class, 'doctor'])->name('signup.doctor'); 
Route::post('/api/register/patient', [SignupController::class, 'patient'])->name('signup.patient');
Route::post('/api/register/pharmacist', [SignupController::class, 'pharmacist'])->name('signup.pharmacist'); 
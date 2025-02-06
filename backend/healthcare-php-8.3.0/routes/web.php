<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PrescriptionDetailController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\BasicHealthRecordController;
use App\Http\Controllers\ForumPostAnswerController;
use App\Http\Controllers\MedicationHistoryController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\VitalSignController;


use App\Http\Controllers\ForumsController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\SurgeryController;
use App\Http\Controllers\SupportCommentController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\SupportController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::middleware('auth.jwt')->get('/protected-route', function (Request $request) {
    return response()->json(['message' => 'This is a protected route']);
});



Route::get('/api/get/users', [UserController::class, 'getAll'])->name('users.get'); 
Route::get('/api/get/pharmacists', [UserController::class, 'getPharmacists'])->name('users.pharmacists');
Route::get('/api/get/doctors', [UserController::class, 'getDoctors'])->name('users.doctors');
Route::get('/api/get/patients', [UserController::class, 'getPatients'])->name('users.patients');
Route::get('/api/get/healthadmins', [UserController::class, 'getHealthAdmins'])->name('users.healthadmins');
Route::get('/api/search/doctors', [UserController::class, 'searchDoctors'])->name('users.searchDoctors'); 
Route::get('/api/get/user', [UserController::class, 'getUser'])->name('users.getUser'); 
Route::get('/api/verify/user/{id}', [UserController::class, 'verifyUser'])->name('users.verifyUser'); 
Route::get('/api/activate/user/{id}', [UserController::class, 'activateUser'])->name('users.activateUser'); 


Route::post('/api/create/user/doctor', [SignupController::class, 'doctor'])->name('doctor.create');
Route::post('/api/create/user/patient', [SignupController::class, 'patient']);
Route::post('/api/create/user/pharmacist', [SignupController::class, 'pharmacist'])->name('pharmacist.create');

Route::post('/api/auth/user/login', [LoginController::class, 'login'])->name('user.login');
Route::post('/api/auth/admin/user/login', [LoginController::class, 'adminlogin'])->name('admin.login');





Route::post('/api/create/forum', [ForumsController::class, 'create']);
Route::put('/api/update/forums/{postId}', [ForumsController::class, 'update']);
Route::delete('/api/delete/forums/{postId}', [ForumsController::class, 'destroy']);
Route::get('/api/get/forum/{postId}', [ForumsController::class, 'getForum']);
Route::get('/api/get/forums', [ForumsController::class, 'getAll']);

Route::post('/api/create/forum/answer', [ForumPostAnswerController::class, 'store']);
Route::get('/api/get/forum/answers/{postId}', [ForumPostAnswerController::class, 'getForumAnswersForPost']);




Route::post('/api/create/appointment', [AppointmentController::class, 'store']);
Route::post('/api/update/appointment/{id}', [AppointmentController::class, 'update']);

Route::get('/api/get/appointments', [AppointmentController::class, 'getAll']);
Route::get('/api/get/user/appointments/{patient_id}', [AppointmentController::class, 'getAppointmentsByPatient']);
Route::get('/api/get/doctor/completed/appointments/{doctor_id}', [AppointmentController::class, 'getCompletedAppointmentsByDoctor']);
Route::get('/api/get/doctor/upcoming/appointments/{doctor_id}', [AppointmentController::class, 'getUpcomingAppointmentsByDoctor']);



Route::post('/api/create/prescription', [PrescriptionController::class, 'store'])->name('prescription.create');
Route::put('/api/update/prescription', [PrescriptionController::class, 'update'])->name('prescription.update');
Route::delete('/api/delete/prescription', [PrescriptionController::class, 'destroy'])->name('prescription.delete');
Route::get('/api/get/prescription/{id}', [PrescriptionController::class, 'getByUser'])->name('prescription.getByUser');

Route::post('/api/create/prescription/details', [PrescriptionDetailController::class, 'store'])->name('prescriptiondetails.create');
Route::put('/api/update/prescription/details', [PrescriptionDetailController::class, 'update'])->name('prescriptiondetails.update');
Route::get('/api/get/prescription/details/{id}', [PrescriptionDetailController::class, 'getByPrescriptionId'])->name('prescriptiondetails.getByPrescriptionId');


Route::post('/api/create/history/FamilyHealth', [MedicationHistoryController::class, 'storeFamilyHealthHistory'])->name('FamilyHealth.store');
Route::post('/api/create/history/Surgeries', [MedicationHistoryController::class, 'storeFamilyHealthHistory'])->name('Surgeries.store');
Route::post('/api/create/history/pastillness', [MedicationHistoryController::class, 'storePastIllnessHistory'])->name('PastIllness.store');
Route::post('/api/create/history/allergies', [MedicationHistoryController::class, 'storeAllergiesHistory'])->name('Allergies.store');
Route::delete('/api/delete/medicalhistory', [MedicationHistoryController::class, 'destroy'])->name('medicalhistory.delete');
Route::get('/api/get/{id}/{type}/history', [MedicationHistoryController::class, 'getMedicationHistoryByUserandType'])->name('MedicationHistoryByUserandType.get');
Route::get('/api/get/{id}/allergies/history', [MedicationHistoryController::class, 'getAllergiesByUser'])->name('AllergiesByUser.get');

Route::get('/api/get/exercise/healthrecords/{id}', [ExerciseController::class, 'getByUser'])->name('exercise.getByUser');
Route::delete('/api/delete/exercise/healthrecord/{id}', [ExerciseController::class, 'destroy'])->name('exercise.delete');
Route::put('/api/update/exercise/healthrecord/{id}', [ExerciseController::class, 'update'])->name('exercise.update');
Route::post('/api/create/exercise/healthrecord', [ExerciseController::class, 'store'])->name('exercise.create');

Route::get('/api/get/basic/healthrecords/{id}', [BasicHealthRecordController::class, 'getByUser'])->name('basichealthrecord.getByUser');
Route::put('/api/update/basic/healthrecord/{id}', [BasicHealthRecordController::class, 'update'])->name('basichealthrecord.update');
Route::post('/api/create/basic/healthrecord', [BasicHealthRecordController::class, 'store'])->name('basichealthrecord.create');

Route::get('/api/get/vitalsigns/{id}', [VitalSignController::class, 'getByUser'])->name('vitals.get');
Route::delete('/api/delete/vitalsign/{id}', [VitalSignController::class, 'destroy'])->name('vitals.delete');
Route::post('/api/create/vitalsign', [VitalSignController::class, 'store'])->name('vitals.create');



Route::get('/api/get/facilities', [SupportController::class, 'getAll'])->name('facilities.getAll');
Route::post('/api/create/facility', [SupportController::class, 'store'])->name('facilities.create');


Route::get('/api/get/support/issues', [SupportController::class, 'getAll'])->name('support.getAll');
Route::post('/api/create/support/issue', [SupportController::class, 'store'])->name('support.create');
Route::get('/api/get/support/issue/{id}/{type}', [SupportController::class, 'getByUserType'])->name('support.getByUserType');
Route::get('/api/get/support/issue/{type}', [SupportController::class, 'getByType'])->name('support.getByType');
Route::get('/api/get/support/issues/{id}', [SupportController::class, 'getByUser'])->name('support.getByUser');
Route::get('/api/get/support/issues', [SupportController::class, 'getAll'])->name('support.getAll');

Route::post('/api/create/support/comment', [SupportCommentController::class, 'store'])->name('supportcomment.create');
Route::get('/api/get/support/comments/{id}', [SupportCommentController::class, 'getBySupportId'])->name('supportcomment.getBySupportId');


Route::put('/api/update/domain/settings', [SettingsController::class, 'update'])->name('settings.update');
Route::get('/api/get/domain/settings', [SettingsController::class, 'get'])->name('settings.get');













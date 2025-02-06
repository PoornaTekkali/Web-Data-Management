<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Patient;
use App\Models\Pharmacist;
use App\Models\Doctor;
use Illuminate\Http\JsonResponse;

class SignupController extends Controller
{
    public function patient(Request $request)
    {
        try {
    // Validate the request data
        $validatedData = $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'firstname' => 'required',
        'lastname' => 'required',
        'phoneNumber' => 'required',
        'dateofbirth' => 'required',
        'gender' => 'required',
        'emergencycontactnumber' => 'required',
        'address' => 'required',
        ]);
        } catch (\Exception $e) {
        
            // If validation fails, throw an exception with validation errors
                return response()->json(['errors' => $e->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Hash the password
        $hashedPassword = Hash::make($validatedData['password']);

         try {
            DB::beginTransaction();

            // Hash the password
            $hashedPassword = Hash::make($validatedData['password']);

            // Create the user
            $user = User::create([
                'email' => $validatedData['email'],
                'password' => $hashedPassword,
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'role' => 'PATIENT',
                'is_verified' => true,
                'is_active' => true
            ]);

            // Create the patient
            $patient = Patient::create([
                'user_id' => $user->id,
                'dateofbirth' => $validatedData['dateofbirth'],
                'gender' => $validatedData['gender'],
                'emergencycontactnumber' => $validatedData['emergencycontactnumber'],
                'address' => $validatedData['address'],
                'phoneNumber' => $validatedData['phoneNumber'],
            ]);

            DB::commit();

            return response()->json(['message' => 'User registered successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            echo "$e";
            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }


    public function doctor(Request $request)
    {


        try {
    // Validate the request data
        $validatedData = $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'firstname' => 'required',
        'lastname' => 'required',
        'phoneNumber' => 'required',
        'gender' => 'required',
        'qualification' => 'required',
        'specialization' => 'required',
        'licensenumber'  => 'required',
        'facility_id' => 'required',
        'about'  => 'required',
        'address' => 'required',
        ]);
        } catch (\Exception $e) {
        
            // If validation fails, throw an exception with validation errors
                return response()->json(['errors' => $e->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Hash the password
        $hashedPassword = Hash::make($validatedData['password']);

         try {
            DB::beginTransaction();

            // Hash the password
            $hashedPassword = Hash::make($validatedData['password']);

            // Create the user
            $user = User::create([
                'email' => $validatedData['email'],
                'password' => $hashedPassword,
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'role' => 'DOCTOR',
                'is_verified' => false,
                'is_active' => true
            ]);

            // Create the Doctor
            $doctor = Doctor::create([
                'user_id' => $user->id,
                'gender' => $validatedData['gender'],
                'qualification' => $validatedData['qualification'],
                'specialization' => $validatedData['specialization'],
                'licensenumber' => $validatedData['licensenumber'],
                'facility_id' => $validatedData['facility_id'],
                'about' => $validatedData['about'],
                'address' => $validatedData['address'],
                'phoneNumber' => $validatedData['phoneNumber'],

            ]);

            DB::commit();

            return response()->json(['message' => 'User registered successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            echo "$e";
            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }

    public function pharmacist(Request $request)
    {


        try {
    // Validate the request data
        $validatedData = $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'firstname' => 'required',
        'lastname' => 'required',
        'phoneNumber' => 'required',
        'qualification' => 'required',
        'licensenumber'  => 'required',
        'facility_id' => 'required',
        'about'  => 'required',
        'address' => 'required',
        ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);

            // If validation fails, throw an exception with validation errors
                //return response()->json(['errors' => $e->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Hash the password
        $hashedPassword = Hash::make($validatedData['password']);

         try {
            DB::beginTransaction();

            // Hash the password
            $hashedPassword = Hash::make($validatedData['password']);

            // Create the user
            $user = User::create([
                'email' => $validatedData['email'],
                'password' => $hashedPassword,
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'role' => 'PHARMACIST',
                'is_verified' => false,
                'is_active' => true
            ]);

            // Create the Doctor
            $pharmacist = Pharmacist::create([
                'user_id' => $user->id,
                'qualification' => $validatedData['qualification'],
                'licensenumber' => $validatedData['licensenumber'],
                'facility_id' => $validatedData['facility_id'],
                'about' => $validatedData['about'],
                'address' => $validatedData['address'],
                'phoneNumber' => $validatedData['phoneNumber'],

            ]);

            DB::commit();

            return response()->json(['message' => 'User registered successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            echo "$e";
            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }
}




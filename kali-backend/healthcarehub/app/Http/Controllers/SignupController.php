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
        'role' => 'required', // Assuming role_id is required
        'dateofbirth' => 'required',
        'gender' => 'required',
        'emergencycontactnumber' => 'required',
        'primarycareprovider' => 'required',
        'is_verified' => 'required'
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
                'phoneNumber' => $validatedData['phoneNumber'],
                'role' => $validatedData['role'],
                'is_verified' => $validatedData['is_verified']
            ]);

            // Create the patient
            $patient = Patient::create([
                'user_id' => $user->id,
                'dateofbirth' => $validatedData['dateofbirth'],
                'gender' => $validatedData['gender'],
                'emergencycontactnumber' => $validatedData['emergencycontactnumber'],
                'primarycareprovider' => $validatedData['primarycareprovider'],
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
        'role' => 'required', // Assuming role_id is required
        'dateofbirth' => 'required',
        'gender' => 'required',
        'qualification' => 'required',
        'specialization' => 'required',
        'licensenumber'  => 'required',
        'healthfacilityname' => 'required',
        'about'  => 'required',
        'is_verified' => 'required'
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
                'phoneNumber' => $validatedData['phoneNumber'],
                'role' => $validatedData['role'],
                'is_verified' => $validatedData['is_verified']
            ]);

            // Create the Doctor
            $doctor = Doctor::create([
                'user_id' => $user->id,
                'dateofbirth' => $validatedData['dateofbirth'],
                'gender' => $validatedData['gender'],
                'qualification' => $validatedData['qualification'],
                'specialization' => $validatedData['specialization'],
                'licensenumber' => $validatedData['licensenumber'],
                'healthfacilityname' => $validatedData['healthfacilityname'],
                'about' => $validatedData['about'],

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
        'role' => 'required', // Assuming role_id is required
        'qualification' => 'required',
        'licensenumber'  => 'required',
        'healthfacilityname' => 'required',
        'about'  => 'required',
        'is_verified' => 'required',
        'starteddate' => 'required'
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
                'phoneNumber' => $validatedData['phoneNumber'],
                'role' => $validatedData['role'],
                'is_verified' => $validatedData['is_verified']
            ]);

            // Create the Doctor
            $pharmacist = Pharmacist::create([
                'user_id' => $user->id,
                'qualification' => $validatedData['qualification'],
                'licensenumber' => $validatedData['licensenumber'],
                'healthfacilityname' => $validatedData['healthfacilityname'],
                'about' => $validatedData['about'],
                'starteddate' => $validatedData['starteddate']

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




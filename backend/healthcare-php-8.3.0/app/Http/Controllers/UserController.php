<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Doctor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\Patient;

class UserController extends Controller
{



    public function getAll()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function getPatients()
    {
        $patients = User::where('role', 'PATIENT')
        ->join('patients', 'users.id', '=', 'patients.user_id')
        ->select('users.firstname', 'users.lastname' , 'users.email' , 'patients.*', 'users.firstname as patient_firstname', 'users.lastname as patient_lastname')
        ->get();
        return response()->json($patients);
    }

    public function verifyUser($id)
    {
        $user = User::find($id);

        // Check if user exists
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->is_verified = !$user->is_verified;

        $user->save();

        // Return a response indicating successful update
        return response()->json(['message' => 'User verification status updated successfully.', 'user' => $user], 200);
    }

    public function activateUser($id)
    {
        $user = User::find($id);

        // Check if user exists
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->is_active = !$user->is_active;

        $user->save();

        // Return a response indicating successful update
        return response()->json(['message' => 'User verification status updated successfully.', 'user' => $user], 200);
    }


    public function getDoctors()
    {
        $doctors = User::where('role', 'DOCTOR')
               ->join('doctors', 'users.id', '=', 'doctors.user_id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'doctors.*', 
                'users.firstname as doctor_firstname', 
                'users.lastname as doctor_lastname',
                'users.is_verified'
            )
               ->get();

        return response()->json($doctors);
    }


    public function getPharmacists()
    {
        $pharmacists = User::where('role', 'PHARMACIST')               
        ->join('pharmacists', 'users.id', '=', 'pharmacists.user_id')
        ->select('users.firstname', 'users.lastname' , 'users.email' , 'pharmacists.*', 'users.firstname as pharmacist_firstname', 'users.lastname as pharmacist_lastname')
        ->get();
        return response()->json($pharmacists);
    }

    public function getHealthAdmins()
    {
        $healthAdmins = User::where('role', 'HEALTHADMIN');
        return response()->json($healthAdmins);
    }

    public function searchDoctors(Request $request)
    {
        $specialization = $request->input('specialization');
        $location = $request->input('location');
        $name = $request->input('name');

        // Query doctors based on the search parameters
        $doctors = Doctor::query();

        if ($specialization) {
            $doctors->where('specialization', 'like', '%' . $specialization . '%');
        }

        if ($location) {
            $doctors->where('address', 'like', '%' . $location . '%');
        }


        // Execute the query and retrieve the results
        $results = $doctors->get();

        // Return the results as JSON response
        return response()->json($results);
    }

    public function getUser(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(compact('user'));
    }
}
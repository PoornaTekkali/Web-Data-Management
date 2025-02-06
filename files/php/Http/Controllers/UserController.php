<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Pharmacist;
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

    public function searchUsers(Request $request)
    {

        $name = $request->input('name');

        // Query doctors based on the search parameters
        $users = User::query();

        if ($name) {
            $users->where('firstname', 'like', '%' . $name . '%');
        }

        $results = $users->get();

        // Return the results as JSON response
        return response()->json($results);
    }

    public function getDoctor($id)
    {
        $doctor = User::where('doctors.id', $id)
               ->join('doctors', 'users.id', '=', 'doctors.user_id')
               ->leftJoin('facilities', 'doctors.facility_id', '=', 'facilities.id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'doctors.*', 
                'facilities.name as facility_name',
                'users.firstname as doctor_firstname', 
                'users.lastname as doctor_lastname',
                'users.is_verified'
            )
               ->get();

        return response()->json($doctor);
    }

    public function getDoctorsProfile(Request $request)
    {
        $user=$request->user;


        $doctor = User::where('doctors.user_id', $user->id)
               ->join('doctors', 'users.id', '=', 'doctors.user_id')
               ->leftJoin('facilities', 'doctors.facility_id', '=', 'facilities.id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'doctors.*', 
                'facilities.name as facility_name',
                'users.firstname as doctor_firstname', 
                'users.lastname as doctor_lastname',
                'users.is_verified'
            )
               ->get();
        return response()->json($doctor);

    }

    public function getPharmacistsProfile(Request $request)
    {
        $user=$request->user;

        $pharmacist = User::where('pharmacists.user_id', $user->id)
               ->join('pharmacists', 'users.id', '=', 'pharmacists.user_id')
               ->leftJoin('facilities', 'pharmacists.facility_id', '=', 'facilities.id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'pharmacists.*', 
                'facilities.name as facility_name',
                'users.firstname as doctor_firstname', 
                'users.lastname as doctor_lastname',
                'users.is_verified'
            )
               ->get();
        return response()->json($pharmacist);

    }



    public function getPatient(Request $request)
    {
        $user=$request->user;
        $patient = User::where('role', 'PATIENT')
        ->where('user_id',$user->id)
        ->join('patients', 'users.id', '=', 'patients.user_id')
        ->select('users.firstname', 'users.lastname' , 'users.email' , 'patients.*', 'users.firstname as patient_firstname', 'users.lastname as patient_lastname')
        ->get();
        return response()->json($patient);
    }

   public function updatePatient(Request $request)
    {
    $user= $request->user;
    // Validate the request data
    $validatedData = $request->validate([
        'firstname' => 'required',
        'lastname' => 'required',
        'phoneNumber' => 'required',
        'dateofbirth' => 'required',
        'gender' => 'required',
        'emergencycontactnumber' => 'required',
        'address' => 'required',
    ]);

    try {
        DB::beginTransaction();

        // Find the user
        $user = User::findOrFail($user->id);
        $user->firstname = $validatedData['firstname'];
        $user->lastname = $validatedData['lastname'];
        $user->save();

        // Find the patient
        $patient = Patient::where('user_id', $user->id)->firstOrFail();
        $patient->dateofbirth = $validatedData['dateofbirth'];
        $patient->gender = $validatedData['gender'];
        $patient->emergencycontactnumber = $validatedData['emergencycontactnumber'];
        $patient->address = $validatedData['address'];
        $patient->phoneNumber = $validatedData['phoneNumber'];
        $patient->save();

        DB::commit();

        return response()->json(['message' => 'User updated successfully'], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'User update failed. Please try again.' , 'error' => $e->getMessage()], 500);
    }
}


public function updatedoctor(Request $request)
    {


        try {
    // Validate the request data
        $validatedData = $request->validate([
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


         try {
            DB::beginTransaction();


        $user = User::findOrFail($request->user_id);

        // Update the user
        $user->update([
            'email' => $request->email,
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
        ]);

        // Fetch the doctor
        $doctor = Doctor::where('user_id', $user->id)->firstOrFail();

        // Update the doctor
        $doctor->update([
            'gender' => $validatedData['gender'],
            'qualification' => $validatedData['qualification'],
            'specialization' => $validatedData['specialization'],
            'licensenumber' => $validatedData['licensenumber'],
            'facility_id' => $validatedData['facility_id'],
            'about' => $validatedData['about'],
            'address' => $validatedData['address'],
            'phoneNumber' => $validatedData['phoneNumber'],
            // Add other doctor fields here
        ]);

            DB::commit();

            return response()->json(['message' => 'User updated successfully' ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            echo "$e";
            return response()->json(['message' => 'User update failed. Please try again.'], 500);
        }
    }


public function updatepharmacist(Request $request)
    {


        try {
    // Validate the request data
        $validatedData = $request->validate([
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
        
            // If validation fails, throw an exception with validation errors
                return response()->json(['errors' => $e->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }


         try {
            DB::beginTransaction();


        $user = User::findOrFail($request->user_id);

        // Update the user
        $user->update([
            'email' => $request->email,
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
        ]);

        // Fetch the doctor
        $pharmacist = Pharmacist::where('user_id', $user->id)->firstOrFail();

        // Update the doctor
        $pharmacist->update([
            'qualification' => $validatedData['qualification'],
            'licensenumber' => $validatedData['licensenumber'],
            'facility_id' => $validatedData['facility_id'],
            'about' => $validatedData['about'],
            'address' => $validatedData['address'],
            'phoneNumber' => $validatedData['phoneNumber'],
            // Add other doctor fields here
        ]);

            DB::commit();

            return response()->json(['message' => 'User updated successfully' ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            echo "$e";
            return response()->json(['message' => 'User update failed. Please try again.'], 500);
        }
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



    public function getPatients()
    {
        $patients = User::where('role', 'PATIENT')
        ->join('patients', 'users.id', '=', 'patients.user_id')
        ->select('users.firstname', 'users.lastname' , 'users.email' , 'patients.*', 'users.role' , 'users.firstname as patient_firstname', 'users.lastname as patient_lastname')
        ->get();
        return response()->json($patients);
    }


    public function getDoctors()
    {
        $doctors = User::where('role', 'DOCTOR')
               ->join('doctors', 'users.id', '=', 'doctors.user_id')
               ->leftJoin('facilities', 'doctors.facility_id', '=', 'facilities.id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'users.role',
                'doctors.*', 
                'facilities.name as facility_name',
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
        ->leftJoin('facilities', 'pharmacists.facility_id', '=', 'facilities.id')
        ->select('users.firstname', 'users.lastname' , 'users.email' , 'pharmacists.*', 'users.firstname as pharmacist_firstname', 'users.lastname as pharmacist_lastname' , 'users.is_verified', 'facilities.name as facility_name', 'users.role' ) 
        ->get();
        return response()->json($pharmacists);
    }

    public function getHealthAdmins()
    {
        $healthAdmins = User::where('role', 'HEALTHADMIN');
        return response()->json($healthAdmins);
    }



        public function searchDoctorsForAppointments(Request $request)
    {
        $specialization = $request->input('specialization');
        $location = $request->input('location');
        $name = $request->input('name');

        $doctors = User::where('role', 'DOCTOR')
           ->join('doctors', 'users.id', '=', 'doctors.user_id')
           ->leftJoin('facilities', 'doctors.facility_id', '=', 'facilities.id')
           ->select('users.firstname', 
            'users.lastname' , 
            'users.email' , 
            'doctors.*', 
            'users.role' , 
            'facilities.name as facility_name',
            'users.firstname as doctor_firstname', 
            'users.lastname as doctor_lastname',
            'users.is_verified'
        );
        
        if ($name) {
    $doctors->where('users.firstname', 'like', '%' . $name . '%');
    }


        if ($specialization) {
            $doctors->where('specialization', 'like', '%' . $specialization . '%');
        }

        if ($location) {
            $doctors->where('address', 'like', '%' . $location . '%');
        }



        $results = $doctors->get();

        // Return the results as JSON response
        return response()->json($results);
    }

    public function searchDoctorsbyName(Request $request)
    {

    $searchQuery = $request->input('name'); // Assuming searchQuery is the parameter for the name search

    $query = User::where('role', 'DOCTOR')
           ->join('doctors', 'users.id', '=', 'doctors.user_id')
           ->leftJoin('facilities', 'doctors.facility_id', '=', 'facilities.id')
           ->select('users.firstname', 
            'users.lastname' , 
            'users.email' , 
            'doctors.*', 
            'users.role' , 
            'facilities.name as facility_name',
            'users.firstname as doctor_firstname', 
            'users.lastname as doctor_lastname',
            'users.is_verified'
        );

    if ($searchQuery) {
        // Apply first name search filter
        $query->where('users.firstname', 'like', "%$searchQuery%");
    }

    $doctors = $query->get();

    return response()->json($doctors);
}

    public function searchPatientsbyName(Request $request)
    {

        $searchQuery = $request->input('name'); 
        $query = User::where('role', 'PATIENT')
               ->join('patients', 'users.id', '=', 'patients.user_id')
               ->select('users.firstname', 
                'users.lastname' , 
                'users.email' , 
                'patients.*', 

                'users.role' , 
                'users.is_verified'
            );

        if ($searchQuery) {
            $query->where('users.firstname', 'like', "%$searchQuery%");
        }

        $patients = $query->get();

        return response()->json($patients);
    }

    public function searchPharmacistsbyName(Request $request)
    {

    $searchQuery = $request->input('name'); 

    $query = User::where('role', 'PHARMACIST')
           ->join('pharmacists', 'users.id', '=', 'pharmacists.user_id')
           ->leftJoin('facilities', 'pharmacists.facility_id', '=', 'facilities.id')
           ->select('users.firstname', 
            'users.lastname' , 
            'users.email' , 
            'pharmacists.*', 
            'users.role' ,  
            'facilities.name as facility_name',
            'users.is_verified'
        );

    if ($searchQuery) {
        // Apply first name search filter
        $query->where('users.firstname', 'like', "%$searchQuery%");
    }

    $pharmacists = $query->get();

    return response()->json($pharmacists);
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
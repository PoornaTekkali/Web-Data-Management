<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index()
    {
        $prescriptions = Prescription::all();
        return response()->json($prescriptions);
    }

    public function getByUser(Request $request, $id)
    {
        $prescriptions = Prescription::where('user_id', $id)
            ->join('users', 'patients.user_id', '=', 'users.id')
            ->select(
                'patients.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($prescriptions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'issued_date' => 'required|date',
            'provider_id' => 'required|exists:users,id',
            'status' => 'string|in:Active,Inactive'
        ]);

        $prescription = Prescription::create($request->all());
        return response()->json($prescription, 201);
    }

    public function update(Request $request, $id)
    {
        $prescription = Prescription::findOrFail($id);
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'issued_date' => 'required|date',
            'provider_id' => 'required|exists:users,id',
            'status' => 'string|in:Active,Inactive'
        ]);

        $prescription->update($request->all());
        return response()->json($prescription, 200);
    }


    public function destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();
        return response()->json(['message' => 'Prescription deleted successfully']);
    }
}

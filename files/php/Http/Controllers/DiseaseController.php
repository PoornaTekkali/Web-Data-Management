<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Disease;

class DiseaseController extends Controller
{
    public function index()
    {
        $diseases = Disease::all();
        return response()->json($diseases);
    }

    public function show($id)
    {
        $disease = Disease::with('symptoms')->find($id);
        return response()->json($disease);
    }
    public function checkDisease(Request $request)
    {
        $symptoms = $request->input('symptoms', []);

        // Logic to find diseases based on symptoms
        $diseases = Disease::whereHas('symptoms', function ($query) use ($symptoms) {
            $query->whereIn('name', $symptoms);
        })->get();

        return response()->json($diseases);
    }
}

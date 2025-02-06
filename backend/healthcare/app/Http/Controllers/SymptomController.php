<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Symptom;

class SymptomController extends Controller
{
    public function getAll()
    {
        $symptoms = Symptom::all();
        return response()->json($symptoms);
    }

    public function show($id)
    {
        $symptom = Symptom::with('diseases')->find($id);
        return response()->json($symptom);
    }
}

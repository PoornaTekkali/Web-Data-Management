<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    public function store(Request $request)
    {
        $user=$request->user;
        $request->validate([
            'workout' => 'required|string',
            'date' => 'required|date',
            'intensity' => 'required|string',
            'duration' => 'required|string',
        ]);

        $exercise = Exercise::create([
            'workout' => $request->workout,
            'date' =>  $request->date,
            'intensity' => $request->intensity,
            'duration' =>  $request->duration,
            'user_id' => $user->id
        ]);


        return response()->json($exercise, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'workout' => 'required|string',
            'date' => 'required|date',
            'intensity' => 'required|string',
            'duration' => 'required|string',
        ]);

        $exercise = Exercise::findOrFail($id);

        $exercise->update($request->all());

        return response()->json($exercise, 200);
    }


    public function getByUser(Request $request)
    {
        $user=$request->user;
        $exercise = Exercise::where('user_id', $user->id)
            ->join('users', 'exercises.user_id', '=', 'users.id')
            ->select(
                'exercises.*',
                'users.firstname as user_firstname',
                'users.lastname as user_lastname',
                'users.email as user_email',
            )
            ->get();
        return response()->json($exercise);
    }

    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();

        return response()->json(['message' => 'Exercise data deleted successfully']);
    }
}

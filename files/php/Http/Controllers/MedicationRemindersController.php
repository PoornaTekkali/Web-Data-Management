<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicationReminders;

class MedicationRemindersController extends Controller
{

    public function get(Request $request, $id)
    {
        $medicationReminder = MedicationReminders::where('prescription_details_id' , $id);
        return response()->json($medicationReminder);
    }

    public function getMedicationReminderByAuthenticatedUser(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'time' => 'required|in:morning,afternoon,night'
        ]);

        $time = $request->input('time');

        $medicationReminder = MedicationReminders::where('user_id', $user->id)
                                ->where($time, 1)
                                ->join('prescription_details' , 'prescription_details.id' , '=' , 'medication_reminders.prescription_details_id' )
                                ->select(
                                    'prescription_details.name',
                                    'prescription_details.dosage'
                                )
                                ->get(); // Execute the query and retrieve the results

        return response()->json($medicationReminder);
    }


    public function store(Request $request)
    {
    try {
        $user = $request->user;

        $request->validate([
            'prescription_details_id' => 'required',
            'time' => 'required', // You may want to add more validation rules here.
        ]);

        // Splitting time assuming the format is "morning-afternoon-night"
        $timeParts = explode('-', $request->time);
        $morning = $timeParts[0] ?? null;
        $afternoon = $timeParts[1] ?? null;
        $night = $timeParts[2] ?? null;

  
            // Creating MedicationReminders instance
            $medicationReminder = MedicationReminders::create([
                'prescription_details_id' => $request->prescription_details_id,
                'morning' => $morning,
                'night' => $night,
                'afternoon' => $afternoon,
                'user_id' => $user->id,
            ]);

            // Returning JSON response for successful creation
            return response()->json([
                'message' => 'Medication Reminder created successfully',
                'medicationReminder' => $medicationReminder,
            ], 200);
        } 

        catch (QueryException $e) {
            Log::error('Error creating medication reminder: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to create medication reminder. Please try again later.',
            ], 500);
        }

    }


    public function destroy(Request $request, $id ){

        $medicationreminder = MedicationReminders::where('prescription_details_id',$id);
        $medicationreminder->delete();
        return response()->json(['message' => 'Medication Reminder deleted successfully']);
        
    }
}

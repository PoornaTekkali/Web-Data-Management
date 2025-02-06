<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function getAll()
    {
        $appointments = Appointment::join('users as patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users as doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->select(
                'appointments.*',
                'patients.firstname as patient_firstname',
                'patients.lastname as patient_lastname',
                'patients.email as patient_email',
                'doctors.firstname as doctor_firstname',
                'doctors.lastname as doctor_lastname',
                'doctors.email as doctor_email'
            )
            ->get();
        return response()->json($appointments);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Appointment data deleted successfully']);
    }


    public function store(Request $request)
    {
        $request->validate([
            'reason' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'duration' => 'required|integer',
            'doctor_id' => 'required|exists:users,id',
        ]);

        $date = new \DateTime($request->date);
        $formattedDate = $date->format('Y-m-d');
        $user = $request->user;

        $appointment = Appointment::create([
            'date' => $formattedDate,
            'reason' => $request->reason,
            'time' => $request->time,
            'duration' => $request->duration,
            'doctor_id' => $request->doctor_id,
            'patient_id' => $user->id,
            'status' => "Active"
        ]);


        return response()->json($appointment, 200);
    }


    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $request->validate([
            'reason' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'duration' => 'required|string',
            'status' => 'string|in:Active,Cancelled,Completed'
        ]);


        $appointment->update($request->all());
        return response()->json($appointment, 200);
    }

    public function getAppointmentsByPatient(Request $request)
    {
        $user = $request->user;
        $appointments = Appointment::where('patient_id', $user->id)
            ->join('users as patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users as doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->select(
                'appointments.*',
                'patients.firstname as patient_firstname',
                'patients.lastname as patient_lastname',
                'patients.email as patient_email',
                'doctors.firstname as doctor_firstname',
                'doctors.lastname as doctor_lastname',
                'doctors.email as doctor_email'
            )
            ->orderBy('appointments.status')
            ->get();
        return response()->json($appointments, 200);
    }

    public function getCompletedAppointmentsByDoctor(Request $request)
    {
        $user = $request->user;
        $appointments = Appointment::where('doctor_id', $user->id)
            ->where('status', '!=', 'Active')
            ->join('users as patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users as doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->select(
                'appointments.*',
                'patients.firstname as patient_firstname',
                'patients.lastname as patient_lastname',
                'patients.email as patient_email',
                'doctors.firstname as doctor_firstname',
                'doctors.lastname as doctor_lastname',
                'doctors.email as doctor_email'
            )
        ->get();

        return response()->json($appointments, 200);
    }

    public function getUpcomingAppointmentsByDoctor(Request $request)
    {
        $user = $request->user;
        $appointments = Appointment::where('doctor_id', $user->id)
            ->where('status', 'Active')
            ->join('users as patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users as doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->select(
                'appointments.*',
                'patients.firstname as patient_firstname',
                'patients.lastname as patient_lastname',
                'patients.email as patient_email',
                'doctors.firstname as doctor_firstname',
                'doctors.lastname as doctor_lastname',
                'doctors.email as doctor_email'
            )
        ->get();
        return response()->json($appointments, 200);
    }

    public function getAnalyticsData(Request $request)
    {   
        $user= $request->user;
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->addDays(6)->endOfDay();

        $appointments = Appointment::where('doctor_id', $user->id)
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->selectRaw('DATE(date) as date')
                                    ->selectRaw('COUNT(*) as appointmentCount')
                                    ->groupByRaw('DATE(date)')
                                    ->get();

        // Format the data for setAnalyticsData function
        $analyticsData = $appointments->map(function ($appointment) {
            return [
                'date' => $appointment->date,
                'appointmentCount' => $appointment->appointmentCount,
            ];
        });

        return response()->json($analyticsData, 200);
    }

}

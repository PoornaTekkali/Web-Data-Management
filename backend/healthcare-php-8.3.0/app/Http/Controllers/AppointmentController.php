<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;

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



    public function store(Request $request)
    {
        $request->validate([
            'reason' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'duration' => 'required|string',
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'status' => 'string|in:Active,Cancelled,Completed'
        ]);

        $appointment = Appointment::create($request->all());
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
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'status' => 'string|in:Active,Cancelled,Completed'
        ]);

        $appointment->update($request->all());
        return response()->json($appointment, 200);
    }

    public function getAppointmentsByPatient($patient_id)
    {
        $appointments = Appointment::where('patient_id', $patient_id)
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

    public function getCompletedAppointmentsByDoctor($doctor_id)
    {
        $appointments = Appointment::where('doctor_id', $doctor_id)
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

    public function getUpcomingAppointmentsByDoctor($doctor_id)
    {
                $appointments = Appointment::where('doctor_id', $doctor_id)
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
}

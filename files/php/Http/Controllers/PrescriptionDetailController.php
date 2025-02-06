<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\PrescriptionDetail;


class PrescriptionDetailController extends Controller
{
    public function getByPrescriptionId($prescriptionId)
    {
        $prescriptionDetails = PrescriptionDetail::where('prescription_id', $prescriptionId)->get();
        return response()->json($prescriptionDetails);
    }

    public function getByPrescriptionIdforPatient($prescriptionId)
    {
$prescriptionDetails = PrescriptionDetail::where('prescription_id', $prescriptionId)
        ->leftJoin('medication_reminders', function ($join) {
            $join->on('prescription_details.id', '=', 'medication_reminders.prescription_details_id');
        })
        ->select(
            'prescription_details.*',
            'medication_reminders.id as medication_reminders_id',
        )
        ->get();

    return response()->json($prescriptionDetails);
}

    public function update(Request $request)
    {
        $request->validate([
            'editedprescriptionDetails.*.id' => 'required|exists:prescription_details,id',
            'editedprescriptionDetails.*.name' => 'required|string',
            'editedprescriptionDetails.*.dosage' => 'required|string',
            'editedprescriptionDetails.*.time' => 'required|string'
        ]);


        try {
            
            DB::beginTransaction();
            $prescriptionDetails = $request->editedprescriptionDetails;
            foreach ($prescriptionDetails as $detailData) {
                $prescriptionDetail = PrescriptionDetail::findOrFail($detailData['id']);

                $prescriptionDetail->update([
                    'name' => $detailData['name'],
                    'dosage' => $detailData['dosage'],
                    'time' => $detailData['time']
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Prescription details updated successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update prescription details.' , 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $prescriptionDetail = PrescriptionDetail::findOrFail($id);
        $prescriptionDetail->delete();
        return response()->json(['message' => 'Medication deleted successfully']);
    }


}

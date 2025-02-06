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

    

    public function store(Request $request)
    {
        $request->validate([
            'prescription_id' => 'required|exists:prescriptions,id',
            '*.name' => 'required|string',
            '*.dosage' => 'required|integer',
            '*.time' => 'required|string'
        ]);

        try {
            DB::beginTransaction();

            $prescriptionDetails = [];

            foreach ($request->all() as $detailData) {
                $prescriptionDetail = PrescriptionDetail::create([
                    'prescription_id' => $request->prescription_id,
                    'name' => $detailData['name'],
                    'dosage' => $detailData['dosage'],
                    'time' => $detailData['time']
                ]);
                
                $prescriptionDetails[] = $prescriptionDetail;
            }

            DB::commit();

            return response()->json($prescriptionDetails, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to store prescription details.'], 500);
        }
    }

    public function update(Request $request, $prescriptionId)
    {
        $request->validate([
            '*.id' => 'required|exists:prescription_details,id',
            '*.name' => 'required|string',
            '*.dosage' => 'required|integer',
            '*.time' => 'required|string'
        ]);

        try {
            DB::beginTransaction();

            foreach ($request->all() as $detailData) {
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
            return response()->json(['message' => 'Failed to update prescription details.'], 500);
        }
    }


}

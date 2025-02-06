<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Disease;
use App\Models\Symptom;

class DiseaseSeeder extends Seeder
{
    public function run()
    {
        // Common Cold
        $commonCold = Disease::create([
            'name' => 'Common Cold',
            'description' => 'A mild viral infection causing respiratory symptoms',
            'precautions' => 'Rest, fluids, over-the-counter medications'
        ]);
        $commonCold->symptoms()->attach([
            Symptom::where('name', 'Runny or stuffy nose')->first()->id,
            Symptom::where('name', 'Sneezing')->first()->id,
            Symptom::where('name', 'Cough')->first()->id,
            Symptom::where('name', 'Sore Throat')->first()->id,
            Symptom::where('name', 'Fever')->first()->id
        ]);

        // Influenza (Flu)
        $flu = Disease::create([
            'name' => 'Influenza (Flu)',
            'description' => 'A viral infection with more severe symptoms than the common cold',
            'precautions' => 'Rest, hydration, antiviral medications'
        ]);
        $flu->symptoms()->attach([
            Symptom::where('name', 'Fever')->first()->id,
            Symptom::where('name', 'Cough')->first()->id,
            Symptom::where('name', 'Sore Throat')->first()->id,
            Symptom::where('name', 'Muscle aches')->first()->id,
            Symptom::where('name', 'Fatigue')->first()->id,
            Symptom::where('name', 'Headache')->first()->id
        ]);

        // Seasonal Allergies
        $seasonalAllergies = Disease::create([
            'name' => 'Seasonal Allergies',
            'description' => 'Immune system reaction to seasonal allergens',
            'precautions' => 'Antihistamines, avoiding allergens'
        ]);
        $seasonalAllergies->symptoms()->attach([
            Symptom::where('name', 'Runny or stuffy nose')->first()->id,
            Symptom::where('name', 'Sneezing')->first()->id,
            Symptom::where('name', 'Itchy Eyes')->first()->id,
            Symptom::where('name', 'Red Eyes')->first()->id
        ]);

        // Tension Headache
        $tensionHeadache = Disease::create([
            'name' => 'Tension Headache',
            'description' => 'Mild to moderate headache caused by stress or tension',
            'precautions' => 'Rest, relaxation, pain relievers'
        ]);
        $tensionHeadache->symptoms()->attach([
            Symptom::where('name', 'Headache')->first()->id,
            Symptom::where('name', 'Fatigue')->first()->id,
            Symptom::where('name', 'Difficulty Concentrating')->first()->id
        ]);

        // Gastroenteritis
        $gastroenteritis = Disease::create([
            'name' => 'Gastroenteritis',
            'description' => 'Stomach and intestinal inflammation often due to viral or bacterial infection',
            'precautions' => 'Clear liquids, rest, bland diet'
        ]);
        $gastroenteritis->symptoms()->attach([
            Symptom::where('name', 'Nausea')->first()->id,
            Symptom::where('name', 'Vomiting')->first()->id,
            Symptom::where('name', 'Diarrhea')->first()->id,
            Symptom::where('name', 'Abdominal pain')->first()->id
        ]);

        // Asthma
        $asthma = Disease::create([
            'name' => 'Asthma',
            'description' => 'Chronic respiratory condition causing breathing difficulties',
            'precautions' => 'Inhalers, avoiding triggers'
        ]);
        $asthma->symptoms()->attach([
            Symptom::where('name', 'Shortness of breath')->first()->id,
            Symptom::where('name', 'Cough')->first()->id,
            Symptom::where('name', 'Chest tightness')->first()->id
        ]);

        // Hypertension
        $hypertension = Disease::create([
            'name' => 'Hypertension',
            'description' => 'High blood pressure',
            'precautions' => 'Healthy diet, exercise, medication'
        ]);
        $hypertension->symptoms()->attach([
            Symptom::where('name', 'Headache')->first()->id,
            Symptom::where('name', 'Fatigue')->first()->id,
            Symptom::where('name', 'Dizziness')->first()->id,
            Symptom::where('name', 'Chest pain')->first()->id
        ]);

        // Migraine
        $migraine = Disease::create([
            'name' => 'Migraine',
            'description' => 'Severe headaches with additional symptoms',
            'precautions' => 'Dark room, hydration, pain relievers'
        ]);
        $migraine->symptoms()->attach([
            Symptom::where('name', 'Headache')->first()->id,
            Symptom::where('name', 'Nausea')->first()->id,
        ]);

        // Food Poisoning
        $foodPoisoning = Disease::create([
            'name' => 'Food Poisoning',
            'description' => 'Illness caused by contaminated food or water',
            'precautions' => 'Hydration, rest, medical attention if severe'
        ]);
        $foodPoisoning->symptoms()->attach([
            Symptom::where('name', 'Nausea')->first()->id,
            Symptom::where('name', 'Vomiting')->first()->id,
            Symptom::where('name', 'Diarrhea')->first()->id,
            Symptom::where('name', 'Abdominal pain')->first()->id,
            Symptom::where('name', 'Fever')->first()->id
        ]);

        // Urinary Tract Infection (UTI)
        $uti = Disease::create([
            'name' => 'Urinary Tract Infection (UTI)',
            'description' => 'Infection in the urinary system',
            'precautions' => 'Hydration, antibiotics, rest'
        ]);
        $uti->symptoms()->attach([
            Symptom::where('name', 'Abdominal pain')->first()->id
        ]);

        // Add more diseases and their associated symptoms here
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Symptom;



class SymptomSeeder extends Seeder
{
    public function run()
    {
        $symptoms = [
        [
            "symptomID" => 1,
            "name" => "Runny or Stuffy Nose",
            "description" => "Nasal congestion with clear or colored discharge"
        ],
        [
            "symptomID" => 2,
            "name" => "Sneezing",
            "description" => "Frequent sneezing"
        ],
        [
            "symptomID" => 3,
            "name" => "Cough",
            "description" => "Persistent coughing"
        ],
        [
            "symptomID" => 4,
            "name" => "Sore Throat",
            "description" => "Pain or irritation in the throat"
        ],
        [
            "symptomID" => 5,
            "name" => "Fever",
            "description" => "Elevated body temperature"
        ],
        [
            "symptomID" => 6,
            "name" => "Chills",
            "description" => "Feeling of coldness or shivering"
        ],
        [
            "symptomID" => 7,
            "name" => "Fatigue",
            "description" => "Extreme tiredness or lack of energy"
        ],
        [
            "symptomID" => 8,
            "name" => "Headache",
            "description" => "Pain or discomfort in the head or upper neck"
        ],
        [
            "symptomID" => 9,
            "name" => "Nausea",
            "description" => "Feeling of sickness with an inclination to vomit"
        ],
        [
            "symptomID" => 10,
            "name" => "Vomiting",
            "description" => "Forcibly expelling stomach contents through the mouth"
        ],
        [
            "symptomID" => 11,
            "name" => "Diarrhea",
            "description" => "Frequent and watery bowel movements"
        ],
        [
            "symptomID" => 12,
            "name" => "Abdominal Pain",
            "description" => "Pain or discomfort in the abdominal area"
        ],
        [
            "symptomID" => 13,
            "name" => "Shortness of Breath",
            "description" => "Difficulty breathing or a feeling of suffocation"
        ],
        [
            "symptomID" => 14,
            "name" => "Chest Pain",
            "description" => "Discomfort or pain in the chest"
        ],
        [
            "symptomID" => 15,
            "name" => "Joint Pain",
            "description" => "Pain or discomfort in the joints"
        ],
        [
            "symptomID" => 16,
            "name" => "Muscle Aches",
            "description" => "Pain or discomfort in the muscles"
        ],
        [
            "symptomID" => 17,
            "name" => "Back Pain",
            "description" => "Pain or discomfort in the back"
        ],
        [
            "symptomID" => 18,
            "name" => "Dizziness",
            "description" => "Feeling lightheaded or unsteady"
        ],
        [
            "symptomID" => 19,
            "name" => "Ear Pain",
            "description" => "Pain or discomfort in the ear"
        ],
        [
            "symptomID" => 20,
            "name" => "Difficulty Urinating",
            "description" => "Trouble with the urinary flow"
        ],
        [
            "symptomID" => 21,
            "name" => "Burning Sensation During Urination",
            "description" => "Pain or burning sensation during urination"
        ],
        [
            "symptomID" => 22,
            "name" => "Rash",
            "description" => "Skin irritation or discoloration"
        ],
        [
            "symptomID" => 23,
            "name" => "Red Eyes",
            "description" => "Eyes appear red or bloodshot"
        ],
        [
            "symptomID" => 24,
            "name" => "Swelling",
            "description" => "Localized or general swelling"
        ],
        [
            "symptomID" => 25,
            "name" => "Fatigue",
            "description" => "Extreme tiredness or lack of energy"
        ],
        [
            "symptomID" => 26,
            "name" => "Insomnia",
            "description" => "Difficulty falling asleep or staying asleep"
        ],
        [
            "symptomID" => 27,
            "name" => "Nausea",
            "description" => "Feeling of sickness with an inclination to vomit"
        ],
        [
            "symptomID" => 28,
            "name" => "Heartburn",
            "description" => "Burning sensation in the chest or throat"
        ],
        [
            "symptomID" => 29,
            "name" => "Stress",
            "description" => "Mental or emotional strain"
        ],
        [
            "symptomID" => 30,
            "name" => "Worry",
            "description" => "Excessive or irrational concerns"
        ],
        [
            "symptomID" => 31,
            "name" => "Restlessness",
            "description" => "Inability to relax or sit still"
        ],
        [
            "symptomID" => 32,
            "name" => "Tiredness",
            "description" => "Feeling of weariness or fatigue"
        ],
        [
            "symptomID" => 33,
            "name" => "Sunburn",
            "description" => "Skin redness and pain due to sun exposure"
        ],
        [
            "symptomID" => 34,
            "name" => "Ear Pain",
            "description" => "Pain or discomfort in the ear"
        ],
        [
            "symptomID" => 35,
            "name" => "Hearing Loss",
            "description" => "Reduced ability to hear"
        ],
        [
            "symptomID" => 36,
            "name" => "Difficulty Swallowing",
            "description" => "Trouble in swallowing food or liquids"
        ],
        [
            "symptomID" => 37,
            "name" => "Acidic Taste in Mouth",
            "description" => "Sour or bitter taste in the mouth"
        ],
        [
            "symptomID" => 38,
            "name" => "Chest Tightness",
            "description" => "Feeling of pressure or tightness in the chest"
        ],
        [
            "symptomID" => 39,
            "name" => "Shortness of Breath",
            "description" => "Difficulty breathing or a feeling of suffocation"
        ],
        [
            "symptomID" => 40,
            "name" => "Excessive Thirst",
            "description" => "Feeling the need to drink more fluids"
        ],
        [
            "symptomID" => 41,
            "name" => "Frequent Urination",
            "description" => "Urinating more often than usual"
        ],
        [
            "symptomID" => 42,
            "name" => "Blurred Vision",
            "description" => "Loss of sharpness of vision"
        ],
        [
            "symptomID" => 43,
            "name" => "Headache",
            "description" => "Pain or discomfort in the head or upper neck"
        ],
        [
            "symptomID" => 44,
            "name" => "Nervousness",
            "description" => "Feeling uneasy or apprehensive"
        ],
        [
            "symptomID" => 45,
            "name" => "Runny Nose",
            "description" => "Excessive nasal discharge"
        ],
        [
            "symptomID" => 46,
            "name" => "Itchy Eyes",
            "description" => "Unpleasant sensation prompting rubbing or scratching of the eyes"
        ],
        [
            "symptomID" => 47,
            "name" => "Swollen Eyes",
            "description" => "Puffiness or swelling around the eyes"
        ],
        [
            "symptomID" => 48,
            "name" => "Tingling Sensation",
            "description" => "Prickling or stinging sensation in the skin"
        ],
        [
            "symptomID" => 49,
            "name" => "Difficulty Concentrating",
            "description" => "Trouble focusing or paying attention"
        ]
        ];

foreach ($symptoms as $symptom) {
    Symptom::create([
        'name' => $symptom['name'],
        'description' => $symptom['description'] // Added description field
    ]);
}
    }
}

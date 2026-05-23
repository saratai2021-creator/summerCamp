<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Rapport;

use App\Models\Etudiant;
use App\Models\Atelier;

use Illuminate\Http\Request;

class RapportController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Créer un rapport
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $validated = $request->validate([

            'etudiant_id' => 'required|exists:etudiants,id',

            'atelier_id' => 'required|exists:ateliers,id',

            'commentaire' => 'required|string',

            'progression' => 'required|string',

            'presence' => 'required|integer|min:0|max:100',

            'note' => 'nullable|numeric|min:0|max:20',
        ]);

        $rapport = Rapport::create([

            'etudiant_id' => $validated['etudiant_id'],

            'atelier_id' => $validated['atelier_id'],

            'commentaire' => $validated['commentaire'],

            'progression' => $validated['progression'],

            'presence' => $validated['presence'],

            'note' => $validated['note'],

            'date_generation' => now(),
        ]);

        return response()->json([
            'message' => 'Rapport créé avec succès',
            'rapport' => $rapport
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | Historique rapports
    |--------------------------------------------------------------------------
    */

    public function history()
    {
        $rapports = Rapport::with([
            'etudiant',
            'atelier'
        ])
        ->latest()
        ->get();

        return response()->json($rapports);
    }

    /*
    |--------------------------------------------------------------------------
    | Rapports d’un atelier
    |--------------------------------------------------------------------------
    */

    public function rapportsByAtelier($atelier_id)
    {
        $rapports = Rapport::with('etudiant')

            ->where('atelier_id', $atelier_id)

            ->latest()

            ->get();

        return response()->json($rapports);
    }

    /*
    |--------------------------------------------------------------------------
    | Rapports d’un étudiant
    |--------------------------------------------------------------------------
    */

    public function rapportsByEtudiant($atelier_id, $etudiant_id)
    {
        $rapports = Rapport::where('atelier_id', $atelier_id)

            ->where('etudiant_id', $etudiant_id)

            ->latest()

            ->get();

        return response()->json($rapports);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Atelier;

class FormateurController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Liste des ateliers
    |--------------------------------------------------------------------------
    |
    | Permet au formateur de voir tous les ateliers.
    |
    */

    public function ateliers()
    {
        return response()->json(
            Atelier::all()
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Étudiants d’un atelier
    |--------------------------------------------------------------------------
    |
    | Charge les étudiants inscrits dans un atelier.
    |
    */

    // public function students($id)
    // {
    //     $atelier = Atelier::with('etudiants')->findOrFail($id);

    //     return response()->json([
    //         'atelier' => $atelier,
    //         'etudiants' => $atelier->etudiants,
    //     ]);
    // }

    public function students($id)
    {
        $atelier = Atelier::with('etudiants')->findOrFail($id);

        return response()->json($atelier);
    }
}
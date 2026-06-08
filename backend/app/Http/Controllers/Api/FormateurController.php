<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Atelier;

class FormateurController extends Controller
{


    public function ateliers()
    {
        return response()->json(
            Atelier::all()
        );
    }



    public function students($id)
    {
        $atelier = Atelier::with('etudiants')->findOrFail($id);

        return response()->json($atelier);
    }
}

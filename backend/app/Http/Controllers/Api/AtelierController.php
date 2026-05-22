<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// This imports the Atelier model to
// interact with the database.
use App\Models\Atelier;

class AtelierController extends Controller
{
    // Get all ateliers
    public function index()
    {
        // return all ateliers from database
        //select * from ateliers
        return response()->json(Atelier::all());
        //returns them as JSON
    }

    // Create a new atelier (admin action)
    public function store(Request $request)
    {
        // validate incoming data
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'capacite' => 'required|integer|min:1',
            'prix' => 'required|numeric',
            'age_min' => 'required|integer',
            'age_max' => 'required|integer'
        ]);

        // create atelier with validated data
        $atelier = Atelier::create($validated);

        // return created atelier
        return response()->json($atelier, 201);
    }

    // Get one specific atelier
    public function show($id)
    {
        // find atelier or return 404
        $atelier = Atelier::findOrFail($id);

        return response()->json($atelier);
    }

    // Update an atelier (admin action)
    public function update(Request $request, $id)
    {
        // find atelier
        $atelier = Atelier::findOrFail($id);

        // validate data
        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date',
            'capacite' => 'sometimes|integer|min:1',
            'prix' => 'sometimes|numeric',
            'age_min' => 'sometimes|integer',
            'age_max' => 'sometimes|integer'
        ]);
          //sometimes means validate only if the field exists
        // update atelier
        $atelier->update($validated);

        return response()->json($atelier);
    }

    // Delete an atelier (admin action)
    public function destroy($id)
    {
        // fiand atelier
        $atelier = Atelier::findOrFail($id);

        // delete atelier
        $atelier->delete();

        return response()->json([
            'message' => 'Atelier deleted successfully'
        ]);
    }
}

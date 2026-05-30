<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Atelier;

class AtelierController extends Controller
{
   
    public function index()
    {
        return response()->json(Atelier::all());
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'capacite' => 'required|integer|min:1',
            'prix' => 'required|numeric',
            'age_min' => 'required|integer',
            'age_max' => 'required|integer',
            'image' => 'nullable|string'
        ]);

        $atelier = Atelier::create($validated);

        return response()->json([
            'message' => 'Atelier created successfully',
            'atelier' => $atelier
        ], 201);
    }

    public function show(string $id)
    {
        $atelier = Atelier::findOrFail($id);

        return response()->json($atelier);
    }

    
    public function update(Request $request, string $id)
    {
        $atelier = Atelier::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after:date_debut',
            'capacite' => 'sometimes|integer|min:1',
            'prix' => 'sometimes|numeric',
            'age_min' => 'sometimes|integer',
            'age_max' => 'sometimes|integer',
            'image' => 'sometimes|string'
        ]);

        $atelier->update($validated);

        return response()->json([
            'message' => 'Atelier updated successfully',
            'atelier' => $atelier
        ]);
    }

    
    public function destroy(string $id)
    {
        $atelier = Atelier::findOrFail($id);

        $atelier->delete();

        return response()->json([
            'message' => 'Atelier deleted successfully'
        ]);
    }
}
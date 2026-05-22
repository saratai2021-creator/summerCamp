<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Atelier;
use App\Models\Etudiant;
use App\Models\Reservation;
use App\Models\Planning;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

    // ==============================
    // Get all reservations (Admin)
    // ==============================
    public function index()
    {
        $reservations = Reservation::with(['etudiant', 'atelier', 'planning'])->get();

        $data = $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,

                'nom_enfant' => $reservation->etudiant ? $reservation->etudiant->nom : null,
                'prenom_enfant' => $reservation->etudiant ? $reservation->etudiant->prenom : null,

                'planning_type' => $reservation->planning ? $reservation->planning->type : null,

                'atelier' => $reservation->atelier ? $reservation->atelier->titre : 'Tous les ateliers',

                'date_debut' => $reservation->date_debut,
                'date_fin' => $reservation->date_fin,

                'parent_phone' => $reservation->etudiant ? $reservation->etudiant->parent_telephone : null,

                'statut' => $reservation->statut
            ];
        });

        return response()->json($data);
    }


    // ==============================
    // Create reservation (Parent)
    // ==============================
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'age' => 'required|integer',
            'nom_parent' => 'required',
            'parent_telephone' => 'required',

            'planning_id' => 'required|exists:plannings,id',
            'atelier_id' => 'nullable|exists:ateliers,id',

            'date_debut' => 'required|date',
            'date_fin' => 'required|date'
        ]);

        // create child
        $etudiant = Etudiant::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'age' => $request->age,
            'nom_parent' => $request->nom_parent,
            'parent_telephone' => $request->parent_telephone
        ]);

        $atelierId = $request->atelier_id;

        // check capacity if single activity
        if ($atelierId) {

            $atelier = Atelier::findOrFail($atelierId);

            if ($atelier->capacite <= 0) {
                return response()->json([
                    'message' => 'Atelier complet'
                ], 400);
            }

            $atelier->capacite = $atelier->capacite - 1;
            $atelier->save();
        }

        // create reservation
        $reservation = Reservation::create([
            'etudiant_id' => $etudiant->id,
            'planning_id' => $request->planning_id,
            'atelier_id' => $atelierId,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'statut' => 'en_attente'
        ]);

        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation' => $reservation
        ]);
    }


    // ==============================
    // Confirm reservation (Admin)
    // ==============================
    public function confirm($id)
    {
        $reservation = Reservation::findOrFail($id);

        $reservation->statut = 'confirme';
        $reservation->save();

        return response()->json([
            'message' => 'Reservation confirmed',
            'reservation' => $reservation
        ]);
    }


    // ==============================
    // Cancel reservation (Admin)
    // ==============================
    public function cancel($id)
    {
        $reservation = Reservation::with('atelier')->findOrFail($id);

        if ($reservation->atelier) {

            $atelier = $reservation->atelier;
            $atelier->capacite = $atelier->capacite + 1;
            $atelier->save();

        }

        $reservation->statut = 'annule';
        $reservation->save();

        return response()->json([
            'message' => 'Reservation cancelled',
            'reservation' => $reservation
        ]);
    }

}

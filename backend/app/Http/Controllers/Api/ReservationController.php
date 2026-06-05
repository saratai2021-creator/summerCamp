<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Etudiant;
use App\Models\Atelier;
use Illuminate\Support\Facades\Auth;
class ReservationController extends Controller
{
    // ==============================
    // Get all reservations
    // ==============================
    public function index()
    {
        $reservations = Reservation::with(['etudiant', 'atelier'])->get();

        return response()->json($reservations);
    }

    // ==============================
    // Create reservation
    // ==============================
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'date_naissance' => 'required|date',
            'parent_telephone' => 'required|string',

            'parent_email' => 'required|email|unique:etudiants,parent_email',
            'parent_password' => 'required|min:6',

            'atelier_id' => 'required|exists:ateliers,id'
        ]);

        // create etudiant
        $etudiant = Etudiant::create([
          //'user_id' => Auth::id(),
        'user_id' => 1,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,

            'parent_telephone' => $request->parent_telephone,

            'parent_email' => $request->parent_email,
            'parent_password' => bcrypt($request->parent_password)
        ]);

        // find atelier
        $atelier = Atelier::findOrFail($request->atelier_id);

        // check capacity
        if ($atelier->capacite <= 0) {
            return response()->json([
                'message' => 'Atelier complet'
            ], 400);
        }

        // decrease capacity
        $atelier->capacite -= 1;
        $atelier->save();

        // create reservation
        $reservation = Reservation::create([
            'etudiant_id' => $etudiant->id,
            'atelier_id' => $atelier->id,
            'statut' => 'en_attente'
        ]);

        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation' => $reservation
        ], 201);
    }


    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'atelier_id' => 'required|exists:ateliers,id'
    //     ]);

    //     $user = Auth::user();

    //     $etudiant = Etudiant::where('user_id', $user->id)->first();

    //     if (!$etudiant) {

    //         return response()->json([
    //             'message' => 'Aucun étudiant trouvé'
    //         ], 404);
    //     }

    //     // find atelier
    //     $atelier = Atelier::findOrFail($request->atelier_id);

    //     // check capacity
    //     if ($atelier->capacite <= 0) {

    //         return response()->json([
    //             'message' => 'Atelier complet'
    //         ], 400);
    //     }

    //     // decrease capacity
    //     $atelier->capacite -= 1;

    //     $atelier->save();

    //     // create reservation
    //     $reservation = Reservation::create([
    //         'etudiant_id' => $etudiant->id,
    //         'atelier_id' => $atelier->id,
    //         'statut' => 'en_attente'
    //     ]);

    //     return response()->json([
    //         'message' => 'Reservation created successfully',
    //         'reservation' => $reservation
    //     ], 201);
    // }

    // ==============================
    // Confirm reservation
    // ==============================
    public function confirm(string $id)
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
    // Cancel reservation
    // ==============================
    public function cancel(string $id)
    {
        $reservation = Reservation::with('atelier')->findOrFail($id);

        if ($reservation->atelier) {

            $atelier = $reservation->atelier;

            $atelier->capacite += 1;
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

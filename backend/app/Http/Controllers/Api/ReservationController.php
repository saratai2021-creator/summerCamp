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

    public function index()
    {
        $reservations = Reservation::with(['etudiant', 'atelier'])->get();

        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $request->validate([


            'atelier_id' => 'required|exists:ateliers,id'
        ]);

       $etudiant = Etudiant::where('user_id',Auth::id())->first();


        $atelier = Atelier::findOrFail($request->atelier_id);


        if ($atelier->capacite <= 0) {
            return response()->json([
                'message' => 'Atelier complet'
            ], 400);
        }


        $atelier->capacite -= 1;
        $atelier->save();


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



    public function confirm(string $id)
    {
        $reservation = Reservation::findOrFail($id);


        $reservation->statut = 'payee';

       $reservation->save();

        return response()->json([
            'message' => 'Reservation confirmed',
            'reservation' => $reservation
        ]);
    }

    public function cancel(string $id)
    {
        $reservation = Reservation::with('atelier')->findOrFail($id);

        if ($reservation->atelier) {

            $atelier = $reservation->atelier;

            $atelier->capacite += 1;
            $atelier->save();
        }


        $reservation->statut = 'annulee';


        $reservation->save();

        return response()->json([
            'message' => 'Reservation cancelled',
            'reservation' => $reservation
        ]);
    }

    public function mesReservations()
{
    $etudiant = Etudiant::where(
        'user_id',
        Auth::id()
    )->first();

    return Reservation::with('atelier')
        ->where('etudiant_id', $etudiant->id)
        ->get();
}

}

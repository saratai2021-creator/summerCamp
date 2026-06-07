<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Rapport;

use Illuminate\Support\Facades\Mail;

use App\Mail\RapportMail;
use App\Models\Etudiant;
use Barryvdh\DomPDF\Facade\Pdf;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RapportController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | CRÉER RAPPORT
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'etudiant_id' => 'required|exists:etudiants,id',

            'atelier_id' => 'required|exists:ateliers,id',

            'date_debut' => 'required|date',

            'date_fin' => 'required|date|after_or_equal:date_debut',

            'total_seances' => 'required|integer|min:1',

            'seances_assistees' => 'required|integer|lte:total_seances',

            'appreciation_generale' => 'required|string',

            'points_forts' => 'required|string',

            'points_a_ameliorer' => 'required|string',

            'recommandations' => 'required|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Calcul présence
        |--------------------------------------------------------------------------
        */

        $tauxPresence = (

            $request->seances_assistees

            /

            $request->total_seances

        ) * 100;

        /*
        |--------------------------------------------------------------------------
        | Création rapport
        |--------------------------------------------------------------------------
        */

        $rapport = Rapport::create([

            'etudiant_id' => $request->etudiant_id,

            'atelier_id' => $request->atelier_id,

            /*
            |--------------------------------------------------------------------------
            | user_id temporaire
            |--------------------------------------------------------------------------
            */

            'user_id' => 1,

            'date_debut' => $request->date_debut,

            'date_fin' => $request->date_fin,

            'total_seances' => $request->total_seances,

            'seances_assistees' => $request->seances_assistees,

            'taux_presence' => $tauxPresence,

            'moyenne_exercices' =>
                $request->moyenne_exercices ?? 0,

            'moyenne_examen' =>
                $request->moyenne_examen ?? 0,

            'modules_termines' =>
                $request->modules_termines ?? '',

            'modules_en_cours' =>
                $request->modules_en_cours ?? '',

            'appreciation_generale' =>
                $request->appreciation_generale,

            'points_forts' =>
                $request->points_forts,

            'points_a_ameliorer' =>
                $request->points_a_ameliorer,

            'recommandations' =>
                $request->recommandations,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Charger relations
        |--------------------------------------------------------------------------
        */

        $rapport->load([
            'etudiant',
            'atelier'
        ]);

        /*
        |--------------------------------------------------------------------------
        | Génération PDF
        |--------------------------------------------------------------------------
        */

        $pdf = Pdf::loadView(

            'pdf.rapport',

            [
                'rapport' => $rapport,
            ]

        )->setOptions([

            'isRemoteEnabled' => true,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Nom fichier
        |--------------------------------------------------------------------------
        */

        $studentName =

            $rapport->etudiant->prenom . '_' .

            $rapport->etudiant->nom;

        $fileName =

            $studentName .

            '_rapport_' .

            $rapport->id .

            '.pdf';

        /*
        |--------------------------------------------------------------------------
        | Chemin
        |--------------------------------------------------------------------------
        */

        $path = 'rapports/' . $fileName;

        /*
        |--------------------------------------------------------------------------
        | Sauvegarde fichier
        |--------------------------------------------------------------------------
        */

        Storage::disk('local')->put(

            $path,

            $pdf->output()
        );

        /*
        |--------------------------------------------------------------------------
        | Update chemin
        |--------------------------------------------------------------------------
        */

        $rapport->update([

            'chemin_pdf' => $path,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Réponse
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' => 'Rapport créé avec succès',

            'rapport' => $rapport,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | TÉLÉCHARGER PDF
    |--------------------------------------------------------------------------
    */

    public function download(Rapport $rapport)
{
    /*
    |--------------------------------------------------------------------------
    | Chemin correct
    |--------------------------------------------------------------------------
    */

   $path = storage_path(
    'app/private/' . $rapport->chemin_pdf
);

    /*
    |--------------------------------------------------------------------------
    | Vérification
    |--------------------------------------------------------------------------
    */

    if (! file_exists($path)) {

        return response()->json([

            'message' => 'PDF introuvable',

            'path' => $path

        ], 404);
    }

    /*
    |--------------------------------------------------------------------------
    | Télécharger
    |--------------------------------------------------------------------------
    */

    return response()->download($path);
}
/*
|--------------------------------------------------------------------------
| Envoyer email parent
|--------------------------------------------------------------------------
*/

public function sendEmail(Rapport $rapport)
{
    /*
    |--------------------------------------------------------------------------
    | Email parent
    |--------------------------------------------------------------------------
    */

    $parentEmail =

        $rapport->etudiant->parent_email;

    /*
    |--------------------------------------------------------------------------
    | Vérifier PDF
    |--------------------------------------------------------------------------
    */

    $path = storage_path(

        'app/private/' .

        $rapport->chemin_pdf
    );

    if (! file_exists($path)) {

        return response()->json([

            'message' => 'Fichier PDF introuvable',

        ], 404);
    }

    /*
    |--------------------------------------------------------------------------
    | Envoi email
    |--------------------------------------------------------------------------
    */

    try {

        Mail::to($parentEmail)

            ->send(

                new RapportMail($rapport)
            );

        return response()->json([

            'message' =>
                'Rapport envoyé avec succès',
        ]);

    } catch (\Exception $e) {

        return response()->json([

            'message' => $e->getMessage(),

        ], 500);
    }
}
    /*
    |--------------------------------------------------------------------------
    | HISTORIQUE
    |--------------------------------------------------------------------------
    */

    public function history()
    {
        $rapports = Rapport::with([

            'etudiant',

            'atelier'

        ])
        ->latest()

        ->paginate(10);

        return response()->json($rapports);
    }

    /*
    |--------------------------------------------------------------------------
    | RAPPORTS PAR ATELIER
    |--------------------------------------------------------------------------
    */

    public function rapportsByAtelier($atelier_id)
    {
        $rapports = Rapport::with([

            'etudiant',

            'atelier'

        ])

        ->where('atelier_id', $atelier_id)

        ->latest()

        ->get();

        return response()->json($rapports);
    }

    /*
    |--------------------------------------------------------------------------
    | RAPPORTS PAR ÉTUDIANT
    |--------------------------------------------------------------------------
    */

    // public function rapportsByEtudiant(
    //     $atelier_id,
    //     $etudiant_id
    // ) {

    //     $rapports = Rapport::with([

    //         'atelier'

    //     ])

    //     ->where('etudiant_id', $etudiant_id)

    //     ->where('atelier_id', $atelier_id)

    //     ->latest()

    //     ->get();

    //     return response()->json($rapports);
    // }



    /*
|--------------------------------------------------------------------------
| Rapports du parent connecté
|--------------------------------------------------------------------------
*/

public function parentReports()
{
    $user = Auth::user();

    /*
    |--------------------------------------------------------------------------
    | Trouver étudiant lié au parent
    |--------------------------------------------------------------------------
    */

    $etudiant = Etudiant::where('parent_email', $user->email)->first();

    if (!$etudiant) {

        return response()->json([]);
    }

    /*
    |--------------------------------------------------------------------------
    | Rapports étudiant
    |--------------------------------------------------------------------------
    */

    $rapports = Rapport::with(['atelier'])

        ->where('etudiant_id', $etudiant->id)

        ->latest()

        ->get();

    return response()->json($rapports);
}
}
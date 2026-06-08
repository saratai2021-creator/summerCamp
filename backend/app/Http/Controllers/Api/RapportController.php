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


    public function store(Request $request)
    {


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



        $tauxPresence = (

            $request->seances_assistees

            /

            $request->total_seances

        ) * 100;



        $rapport = Rapport::create([

            'etudiant_id' => $request->etudiant_id,

            'atelier_id' => $request->atelier_id,



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



        $rapport->load([
            'etudiant',
            'atelier'
        ]);



        $pdf = Pdf::loadView(

            'pdf.rapport',

            [
                'rapport' => $rapport,
            ]

        )->setOptions([

            'isRemoteEnabled' => true,
        ]);



        $studentName =

            $rapport->etudiant->prenom . '_' .

            $rapport->etudiant->nom;

        $fileName =

            $studentName .

            '_rapport_' .

            $rapport->id .

            '.pdf';


        $path = 'rapports/' . $fileName;



        Storage::disk('local')->put(

            $path,

            $pdf->output()
        );



        $rapport->update([

            'chemin_pdf' => $path,
        ]);



        return response()->json([

            'message' => 'Rapport créé avec succès',

            'rapport' => $rapport,
        ]);
    }



    public function download(Rapport $rapport)
{


   $path = storage_path(
    'app/private/' . $rapport->chemin_pdf
);



    if (! file_exists($path)) {

        return response()->json([

            'message' => 'PDF introuvable',

            'path' => $path

        ], 404);
    }



    return response()->download($path);
}


public function sendEmail(Rapport $rapport)
{


    $parentEmail =

        $rapport->etudiant->parent_email;



    $path = storage_path(

        'app/private/' .

        $rapport->chemin_pdf
    );

    if (! file_exists($path)) {

        return response()->json([

            'message' => 'Fichier PDF introuvable',

        ], 404);
    }



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



public function parentReports()
{
    $user = Auth::user();


    $etudiant = Etudiant::where('parent_email', $user->email)->first();

    if (!$etudiant) {

        return response()->json([]);
    }



    $rapports = Rapport::with(['atelier'])

        ->where('etudiant_id', $etudiant->id)

        ->latest()

        ->get();

    return response()->json($rapports);
}
}

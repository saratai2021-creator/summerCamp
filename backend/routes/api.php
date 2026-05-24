<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AtelierController;
use App\Http\Controllers\Api\FormateurController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RapportController;



/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// login
Route::post('/login', [AuthController::class, 'login']);
// register
Route::post('/register', [AuthController::class, 'register']);
// ateliers
Route::get('/ateliers', [AtelierController::class, 'index']);
Route::get('/ateliers/{id}', [AtelierController::class, 'show']);

/*
|--------------------------------------------------------------------------
| PARENT ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // reservation
    Route::post('/reservations', [ReservationController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // ateliers
    Route::post('/ateliers', [AtelierController::class, 'store']);
    Route::put('/ateliers/{id}', [AtelierController::class, 'update']);
    Route::delete('/ateliers/{id}', [AtelierController::class, 'destroy']);

    // reservations
    Route::get('/reservations', [ReservationController::class, 'index']);

    Route::patch('/reservations/{id}/confirm', [
        ReservationController::class,
        'confirm'
    ]);

    Route::patch('/reservations/{id}/cancel', [
        ReservationController::class,
        'cancel'
    ]);
});

/*
|--------------------------------------------------------------------------
| FORMATEUR ROUTES
|--------------------------------------------------------------------------
*/


// FAUX ROUTE / -------------------------
// --------------------------------
// --------------------------------


// Route::middleware(['auth:sanctum', 'formateur'])->group(function () {

//     // rapports
//     Route::post('/rapports', [RapportController::class, 'store']);

//     Route::get('/rapports', [RapportController::class, 'index']);

//     Route::get('/rapports/{id}', [RapportController::class, 'show']);

//     Route::put('/rapports/{id}', [RapportController::class, 'update']);

//     Route::delete('/rapports/{id}', [RapportController::class, 'destroy']);
// });




// Route::middleware(['auth:sanctum', 'formateur'])->group(function () {

//     /*
//     |--------------------------------------------------------------------------
//     | ATELIERS
//     |--------------------------------------------------------------------------
//     */

//     // Liste des ateliers
//     Route::get('/ateliers', [AtelierController::class, 'apiIndex']);

//     // Étudiants d’un atelier
//     Route::get('/ateliers/{id}/etudiants', [AtelierController::class, 'apiStudents']);



//     /*
//     |--------------------------------------------------------------------------
//     | RAPPORTS
//     |--------------------------------------------------------------------------
//     */

//     // Créer rapport
//     // Route::post('/rapports', [ReportController::class, 'apiStore']);

//     // // Télécharger PDF
//     // Route::get('/rapports/{report}/download', [ReportController::class, 'apiDownload']);

//     // // Envoyer email
//     // Route::post('/rapports/{report}/send-email', [ReportController::class, 'apiSendEmail']);

//     // // Historique rapports
//     // Route::get('/rapports', [ReportController::class, 'apiHistory']);

//     // // Rapports par atelier
//     // Route::get('/ateliers/{id}/rapports', [ReportController::class, 'apiReportsByAtelier']);

//     // // Rapports étudiant
//     // Route::get(
//     //     '/ateliers/{atelier_id}/etudiants/{etudiant_id}/rapports',
//     //     [ReportController::class, 'apiReportsByStudent']
//     // );



//     /*
//     |--------------------------------------------------------------------------
//     | UTILITAIRES
//     |--------------------------------------------------------------------------
//     */

//     Route::get('/etudiants/{id}', function ($id) {
//         return Etudiant::findOrFail($id);
//     });

//     Route::get('/ateliers/{id}', function ($id) {
//         return Atelier::findOrFail($id);
//     });
// });


/*
|--------------------------------------------------------------------------
| FORMATEUR ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('formateur')->group(function () {

    // Liste ateliers
    Route::get('/ateliers', [
        FormateurController::class,
        'ateliers'
    ]);

    // Étudiants atelier
    Route::get('/ateliers/{id}/etudiants', [
        FormateurController::class,
        'students'
    ]);


    /*
    |--------------------------------------------------
    | Créer rapport
    |--------------------------------------------------
    */
    Route::post('/rapports', [
        RapportController::class,
        'store'
    ]);

    /*
    |--------------------------------------------------
    | Historique
    |--------------------------------------------------
    */
    Route::get('/rapports', [
        RapportController::class,
        'history'
    ]);

    /*
    |--------------------------------------------------
    | Rapports atelier
    |--------------------------------------------------
    */
    Route::get('/ateliers/{id}/rapports', [
        RapportController::class,
        'rapportsByAtelier'
    ]);

    /*
    |--------------------------------------------------
    | Rapports étudiant
    |--------------------------------------------------
    */
    Route::get(
        '/ateliers/{atelier_id}/etudiants/{etudiant_id}/rapports',
        [RapportController::class, 'rapportsByEtudiant']
    );
});
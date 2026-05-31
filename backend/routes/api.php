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

    // rapports parent
    Route::get('/parent/rapports', [
        RapportController::class,
        'parentReports'
    ]);
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

Route::middleware(['auth:sanctum', 'formateur'])

    ->prefix('formateur')

    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | ATELIERS
        |--------------------------------------------------------------------------
        */

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
        |--------------------------------------------------------------------------
        | RAPPORTS
        |--------------------------------------------------------------------------
        */

        // Créer rapport
        Route::post('/rapports', [
            RapportController::class,
            'store'
        ]);

        // Télécharger PDF
        Route::get('/rapports/{rapport}/download', [
            RapportController::class,
            'download'
        ]);

        // Envoyer email parent
        Route::post('/rapports/{rapport}/send-email', [
            RapportController::class,
            'sendEmail'
        ]);

        // Historique
        Route::get('/rapports', [
            RapportController::class,
            'history'
        ]);

        // Rapports atelier
        Route::get('/ateliers/{id}/rapports', [
            RapportController::class,
            'rapportsByAtelier'
        ]);

        // Rapports étudiant
        Route::get(
            '/ateliers/{atelier_id}/etudiants/{etudiant_id}/rapports',
            [RapportController::class, 'rapportsByEtudiant']
        );
    });
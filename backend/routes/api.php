<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AtelierController;
use App\Http\Controllers\Api\FormateurController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RapportController;



Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/ateliers', [AtelierController::class, 'index']);
Route::get('/ateliers/{id}', [AtelierController::class, 'show']);



Route::middleware('auth:sanctum')->group(function () {

    Route::post('/reservations', [ReservationController::class, 'store']);

    Route::get('/parent/rapports', [RapportController::class,'parentReports']);

    Route::get('/mes-reservations',[ReservationController::class,'mesReservations']);

});
// Route::middleware('auth:sanctum')->get('/mes-reservations',
//     [ReservationController::class,'mesReservations']
// );

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::post('/ateliers', [AtelierController::class, 'store']);
    Route::put('/ateliers/{id}', [AtelierController::class, 'update']);
    Route::delete('/ateliers/{id}', [AtelierController::class, 'destroy']);

    Route::get('/reservations', [ReservationController::class, 'index']);

    Route::patch('/reservations/{id}/confirm', [ReservationController::class,'confirm']);

    Route::patch('/reservations/{id}/cancel', [ReservationController::class,'cancel']);
});



Route::middleware(['auth:sanctum', 'formateur'])->prefix('formateur')->group(function () {
    Route::get('/ateliers', [FormateurController::class,'ateliers']);

    Route::get('/ateliers/{id}/etudiants', [FormateurController::class,'students']);


    Route::post('/rapports', [RapportController::class,'store']);


    Route::get('/rapports/{rapport}/download', [RapportController::class,'download']);


    Route::post('/rapports/{rapport}/send-email', [RapportController::class,'sendEmail']);

    Route::get('/rapports', [RapportController::class,'history']);


    Route::get('/ateliers/{id}/rapports', [RapportController::class,'rapportsByAtelier']);

        // Route::get(
        //     '/ateliers/{atelier_id}/etudiants/{etudiant_id}/rapports',
        //     [RapportController::class, 'rapportsByEtudiant']
        // );
    });

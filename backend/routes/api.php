<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AtelierController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RapportController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// login
Route::post('/login', [AuthController::class, 'login']);

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

Route::middleware(['auth:sanctum', 'formateur'])->group(function () {

    // rapports
    Route::post('/rapports', [RapportController::class, 'store']);

    Route::get('/rapports', [RapportController::class, 'index']);

    Route::get('/rapports/{id}', [RapportController::class, 'show']);

    Route::put('/rapports/{id}', [RapportController::class, 'update']);

    Route::delete('/rapports/{id}', [RapportController::class, 'destroy']);
});
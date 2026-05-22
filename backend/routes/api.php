<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AtelierController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PlanningController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Admin login
Route::post('/admin/login', [AuthController::class, 'login']);

// Ateliers
Route::get('/ateliers', [AtelierController::class, 'index']);
Route::get('/ateliers/{id}', [AtelierController::class, 'show']);

// Plannings
Route::get('/plannings', [PlanningController::class, 'index']);

// Reservations (parent)
Route::post('/reservations', [ReservationController::class, 'store']);


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Ateliers
    Route::post('/ateliers', [AtelierController::class, 'store']);
    Route::put('/ateliers/{id}', [AtelierController::class, 'update']);
    Route::delete('/ateliers/{id}', [AtelierController::class, 'destroy']);

    // Plannings
    Route::post('/plannings', [PlanningController::class, 'store']);
    Route::delete('/plannings/{id}', [PlanningController::class, 'destroy']);

    // Reservations (admin)
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::patch('/reservations/{id}/confirm', [ReservationController::class, 'confirm']);
    Route::patch('/reservations/{id}/cancel', [ReservationController::class, 'cancel']);
});

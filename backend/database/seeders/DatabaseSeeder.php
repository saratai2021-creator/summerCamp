<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Atelier;
use App\Models\Etudiant;
use App\Models\Reservation;
use App\Models\Rapport;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);
 User::factory()->create([
            'name' => 'Formateur',
            'email' => 'formateur@gmail.com',
            'password' => Hash::make('123456789'),
            'role' => 'formateur',
        ]);
        // parents + formateurs
        User::factory(5)->create();

        // etudiants
        Etudiant::factory(5)->create();

        // ateliers
        Atelier::factory(5)->create();

        // reservations
        Reservation::factory(5)->create();

        // rapports
        Rapport::factory(5)->create();
    }
}
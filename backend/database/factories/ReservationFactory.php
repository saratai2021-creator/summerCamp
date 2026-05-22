<?php

namespace Database\Factories;

use App\Models\Atelier;
use App\Models\Etudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    public function definition(): array
    {
        return [

            'etudiant_id' => Etudiant::inRandomOrder()
                                     ->first()?->id,

            'atelier_id' => Atelier::inRandomOrder()
                                   ->first()?->id,

            'statut' => fake()->randomElement([
                'en_attente',
                'payee',
                'annulee'
            ]),
        ];
    }
}
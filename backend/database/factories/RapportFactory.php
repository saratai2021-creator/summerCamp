<?php

namespace Database\Factories;

use App\Models\Atelier;
use App\Models\Etudiant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RapportFactory extends Factory
{
    public function definition(): array
    {
        return [

            'etudiant_id' => Etudiant::inRandomOrder()
                                     ->first()?->id,

            'atelier_id' => Atelier::inRandomOrder()
                                   ->first()?->id,

            'user_id' => User::where('role', 'formateur')
                             ->inRandomOrder()
                             ->first()?->id,

            'date_debut' => fake()->date(),

            'date_fin' => fake()->date(),

            'total_seances' => fake()->numberBetween(5, 20),

            'seances_assistees' => fake()->numberBetween(1, 20),

            'taux_presence' => fake()->randomFloat(2, 50, 100),

            'moyenne_exercices' => fake()->randomFloat(2, 0, 20),

            'moyenne_examen' => fake()->randomFloat(2, 0, 20),

            'modules_termines' => fake()->numberBetween(1, 10),

            'modules_en_cours' => fake()->numberBetween(0, 5),

            'appreciation_generale' => fake()->sentence(),

            'points_forts' => fake()->sentence(),

            'points_a_ameliorer' => fake()->sentence(),

            'recommandations' => fake()->sentence(),

            'chemin_pdf' => 'rapport.pdf',
        ];
    }
}
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AtelierFactory extends Factory
{
    public function definition(): array
    {
        return [

            'titre' => fake()->sentence(3),

            'description' => fake()->paragraph(),

            'date_debut' => fake()->date(),

            'date_fin' => fake()->date(),

            'capacite' => fake()->numberBetween(10, 50),

            'prix' => fake()->numberBetween(200, 2000),

            'age_min' => fake()->numberBetween(6, 10),

            'age_max' => fake()->numberBetween(11, 18),

            'image' => 'atelier.jpg',
        ];
    }
}
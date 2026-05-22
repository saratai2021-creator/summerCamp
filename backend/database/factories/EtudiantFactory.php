<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class EtudiantFactory extends Factory
{
    public function definition(): array
    {
        return [

            'user_id' => User::where('role', 'parent')
                             ->inRandomOrder()
                             ->first()?->id,

            'nom' => fake()->lastName(),

            'prenom' => fake()->firstName(),

            'date_naissance' => fake()->date(),

            'parent_telephone' => fake()->phoneNumber(),

            'parent_email' => fake()->unique()->safeEmail(),

            'parent_password' => Hash::make('12345678'),
        ];
    }
}
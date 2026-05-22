<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'capacite',
        'prix',
        'age_min',
        'age_max',
        'image'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
      public function rapports()
    {
        return $this->hasMany(Rapport::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//When you create a model like:
// class Atelier extends Model
// Laravel automatically links it to
//  the table: ateliers
class Atelier extends Model
{
    //These fields are allowed to be inserted or updated.
    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'capacite',
        'prix',
        'age_min',
        'age_max'
    ];
    // One Atelier → Many Reservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}

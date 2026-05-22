<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    //These fields are allowed to be inserted or updated
    protected $fillable = [
        'nom',
        'prenom',
        'age',
        'nom_parent',
        'parent_telephone'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // Fields allowed for mass assignment
    protected $fillable = [
        'etudiant_id',
        'planning_id',
        'atelier_id',
        'date_debut',
        'date_fin',
        'statut'
    ];

    // Relation with student
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    // Relation with atelier
    public function atelier()
    {
        return $this->belongsTo(Atelier::class);
    }

    // Relation with planning
    public function planning()
    {
        return $this->belongsTo(Planning::class);
    }
}

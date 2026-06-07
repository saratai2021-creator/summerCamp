<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    // Fields allowed for mass assignment
    protected $fillable = [
        'etudiant_id',
        'atelier_id',
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

    
   
}

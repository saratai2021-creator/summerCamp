<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    use HasFactory;
    protected $fillable = [

        'etudiant_id',

        'atelier_id',

        'user_id',

        'date_debut',

        'date_fin',

        'total_seances',

        'seances_assistees',

        'taux_presence',

        'moyenne_exercices',

        'moyenne_examen',

        'modules_termines',

        'modules_en_cours',

        'appreciation_generale',

        'points_forts',

        'points_a_ameliorer',

        'recommandations',

        'chemin_pdf'
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function atelier()
    {
        return $this->belongsTo(Atelier::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
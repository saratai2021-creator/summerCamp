<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'etudiant_id',
        'atelier_id',
        'statut'
    ];
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function atelier()
    {
        return $this->belongsTo(Atelier::class);
    }



}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'date_naissance',
        'parent_telephone',
        'parent_email',
        'parent_password'
    ];

    protected $hidden = [
        'password'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function rapports()
    {
        return $this->hasMany(Rapport::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
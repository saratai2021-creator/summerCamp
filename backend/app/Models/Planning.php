<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    protected $fillable = [
        'type',
        'image',
        'category'
    ];

    // Relation: one planning can have many reservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}

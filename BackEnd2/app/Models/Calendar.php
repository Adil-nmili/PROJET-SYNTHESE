<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'opponent',
        'date',
        'time',
        'venue',
        'images',
        'matchupDetails'
    ];
}
    
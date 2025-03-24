<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    

    protected $fillable = [
        'full_name',
        'birth_date',
        'nickname',
        'birth_place',
        'height',
        'weight',
        'championships',
        'image'
    ];
}


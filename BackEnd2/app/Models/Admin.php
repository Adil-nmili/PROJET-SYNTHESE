<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillables = [
        'name',
            'email',
            'matricule',
            'password',
    ];
}

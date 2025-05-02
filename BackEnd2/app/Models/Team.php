<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name',  'description', 'coach', 'stadium', 'founded_year', 'website', 'email', 'phone', 'address', 'city', 'state', ];
}

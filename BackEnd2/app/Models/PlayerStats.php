<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerStats extends Model
{
    protected $fillable = [
        'name',
        'team',
        'position',
        'image',
        'description',
        'points',
        'rebounds',
        'assists',
        'user_id'
    ];

    protected $casts = [
        'points' => 'integer',
        'rebounds' => 'integer',
        'assists' => 'integer'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
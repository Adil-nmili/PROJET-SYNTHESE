<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchCalendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'league',
        'home_team',
        'away_team',
        'home_logo',
        'away_logo',
        'match_date',
        'venue',
        'status',
        'description',
        'user_id'
    ];

    protected $casts = [
        'match_date' => 'datetime',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
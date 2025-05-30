<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchResults extends Model
{
    protected $fillable = [
        'league',
        'status',
        'homeTeam',
        'homeImage',
        'homeScore',
        'awayTeam',
        'awayImage',
        'awayScore',
        'replayLink',
        'homeTeamStats',
        'awayTeamStats',
        'user_id'
    ];

    protected $casts = [
        'homeTeamStats' => 'array',
        'awayTeamStats' => 'array',
        'homeScore' => 'integer',
        'awayScore' => 'integer'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

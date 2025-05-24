<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchResults extends Model
{
    protected $fillable = [
        'homeTeam',
        'homeScore',
        'awayTeam',
        'awayScore',
        'date',
        'status',
        'series',
        'homeImage',
        'awayImage',
        'matchSummaryUrl'
    ];
}

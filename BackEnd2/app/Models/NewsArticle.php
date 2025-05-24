<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    protected $fillable = [
        'title',
        'author',
        'date',
        'video_url',
        'images',
        'content'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'author');
    }
}

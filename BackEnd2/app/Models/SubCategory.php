<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
} 
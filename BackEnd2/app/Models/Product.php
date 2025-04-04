<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable=[
        "name",
        "description",
        "price",
        "quantity",
        "sizes",
        "colors",
        "category_id",
        "product_code",
        "images"
    ];

    public function categorie(){
        return $this->belongsTo(Categorie::class,"category_id");
    }
}

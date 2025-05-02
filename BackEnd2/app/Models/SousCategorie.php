<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categorie;


class SousCategorie extends Model
{
   protected $fillable = [
    'name',
    'image',
    "category_id"
   ];

   public function products()
   {
    return $this->hasMany(Product::class);
   }

   public function categories(){
    return $this->belongsTo(Categorie::class);
   }
}

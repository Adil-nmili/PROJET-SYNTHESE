<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "price",
        "quantity",
        "sizes",
        "colors",
        "category_id",
        "sousCategorie_id",
        "product_code",
        "images"
    ];

    public function categories()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }

    public function sousCategories()
    {
        return $this->belongsTo(SousCategorie::class, 'sousCategorie_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function cartItems()
{
    return $this->hasMany(CartItem::class);
}


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'status',
        'total_amount',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function shippingAddress()
    {
        return $this->hasOne(ShippingAddress::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
} 
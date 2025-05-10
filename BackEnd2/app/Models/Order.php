<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'total_amount',
        'billing_first_name',
        'billing_last_name',
        'billing_company',
        'billing_address',
        'billing_apartment',
        'billing_city',
        'billing_state',
        'billing_postcode',
        'billing_phone',
        'billing_email',
        'payment_method',
        'payment_status',
        'notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
            ->withPivot('quantity', 'price', 'selected_size', 'selected_color')
            ->withTimestamps();
    }
}
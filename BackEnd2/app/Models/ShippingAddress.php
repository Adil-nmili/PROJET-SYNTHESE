<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'full_name',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'postal_code',
        'country',
        'phone_number',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}

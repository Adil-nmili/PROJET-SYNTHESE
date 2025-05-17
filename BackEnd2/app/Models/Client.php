<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Client extends Authenticatable
{
    use HasApiTokens, Notifiable;
    
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'matricule',
        'phone',
        'address',
        'city',
        'country',
        'postal_code',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}

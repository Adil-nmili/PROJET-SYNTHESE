<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class StoreUser extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    // The attributes that are mass assignable
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
        'role', // Typically 'client' for store users
        'password',
    ];

    // The attributes that should be hidden for serialization
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Cast the attributes to the desired data type
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships - You can add other relationships as needed for the store
    public function orders()
    {
        return $this->hasMany(Order::class);  // Assuming a StoreUser has orders
    }

    // Optionally, you can add methods for store-specific functionality
    public function cart()
    {
        return $this->hasMany(Cart::class);  // Assuming store users can have a cart
    }

    // You can add other methods related to the store, such as preferences, wishlist, etc.
}

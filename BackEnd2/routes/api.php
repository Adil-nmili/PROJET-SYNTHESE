<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SousCategorieController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);

// routes/api.php
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/storage/product_images/{filename}', function ($filename) {
    $path = storage_path('app/public/product_images/' . $filename);

    if (!file_exists($path)) {
        abort(404); // Return 404 if the file is not found
    }

    return response()->file($path, ['Content-Type' => 'image/jpeg']);
});


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [UsersController::class,'verifie']);
Route::get('/admins', [UsersController::class,'index']);
Route::get('/admins/{id}', [UsersController::class,'show']);
Route::delete('/admins/{id}', [UsersController::class,'destroy']);
Route::put('/admins/{id}', [UsersController::class,'update']);
Route::post('/admins', [UsersController::class,'store']);
// Route::apiressources([
//     AdminController::class]);
Route::get('/players', [PlayersController::class, 'index']);
Route::post('/players', [PlayersController::class, 'store']);
Route::put('/players/{id}', [PlayersController::class, 'update']);
Route::delete('/players/{id}', [PlayersController::class, 'destroy']);
Route::get('/players/{id}', [PlayersController::class, 'show']);
Route::resource('categories', CategorieController::class);
Route::resource('sub-categorie', SousCategorieController::class);
Route::resource('products', ProductController::class);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::resource('orders', OrderController::class);
Route::resource('teams', TeamController::class);
Route::get('/users/{userId}/orders', [OrderController::class, 'getUserOrders']);
Route::get('/sub-categories', [SubCategoryController::class, 'index']);
Route::get('/sub-categories/{id}', [SubCategoryController::class, 'show']);
Route::post('/sub-categories', [SubCategoryController::class, 'store']);
Route::put('/sub-categories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/sub-categories/{id}', [SubCategoryController::class, 'destroy']);
Route::get('/sub-categories/category/{categoryId}', [SubCategoryController::class, 'getByCategory']);

// Cart routes
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'add']);
Route::put('/cart/update/{itemId}', [CartController::class, 'updateQuantity']);
Route::delete('/cart/remove/{itemId}', [CartController::class, 'remove']);
Route::delete('/cart/clear', [CartController::class, 'clear']);

// Checkout routes
Route::post('/checkout', [OrderController::class, 'checkout']);
Route::post('/orders/{id}/payment', [OrderController::class, 'processPayment']);
Route::post('/coupons/apply', [OrderController::class, 'applyCoupon']);

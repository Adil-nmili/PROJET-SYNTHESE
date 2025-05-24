<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\NewsArticleController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\SousCategorieController;
use App\Http\Controllers\ShippingAddressController;

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


Route::post('/login', [UsersController::class, 'verifie']);
Route::get('/admins', [UsersController::class, 'index']);
Route::get('/admins/{id}', [UsersController::class, 'show']);
Route::delete('/admins/{id}', [UsersController::class, 'destroy']);
Route::put('/admins/{id}', [UsersController::class, 'update']);
Route::post('/admins', [UsersController::class, 'store']);
Route::resource('/clients', ClientController::class);
Route::post('/clients/login', [ClientController::class, 'login']);

Route::get('/players', [PlayersController::class, 'index']);
Route::post('/players', [PlayersController::class, 'store']);
Route::put('/players/{id}', [PlayersController::class, 'update']);
Route::delete('/players/{id}', [PlayersController::class, 'destroy']);
Route::get('/players/{id}', [PlayersController::class, 'show']);
Route::resource('categories', CategorieController::class);
Route::resource('sub-categorie', SousCategorieController::class);
Route::resource('products', ProductController::class);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/similar/{category}', [ProductController::class, 'getSimilarProducts']);
Route::resource('orders', OrderController::class);
Route::get('/orders/last_id',[OrderController::class,'get_id']);
Route::get('/orders/last-id', [OrderController::class, 'getLastOrderId']);
Route::resource('teams', TeamController::class);
Route::get('/clients/{clientId}/orders', [OrderController::class, 'getClientOrders']);
Route::get('/sub-categories', [SubCategoryController::class, 'index']);
Route::get('/sub-categories/{id}', [SubCategoryController::class, 'show']);
Route::post('/sub-categories', [SubCategoryController::class, 'store']);
Route::put('/sub-categories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/sub-categories/{id}', [SubCategoryController::class, 'destroy']);
Route::get('/sub-categories/category/{categoryId}', [SubCategoryController::class, 'getByCategory']);


// Cart routes
Route::get('/cart/{clientId}', [CartController::class, 'show']);
Route::post('/cart', [CartController::class, 'createCart']);
Route::delete('/cart/{clientId}', [CartController::class, 'destroy']);
Route::delete('/cart/clear/{clientId}', [CartController::class, 'clearCart']);

// CartItem routes
Route::post('/cart/add', [CartItemController::class, 'add']);
Route::put('/cart/item/{itemId}', [CartItemController::class, 'update']);
Route::delete('/cart/item/{itemId}', [CartItemController::class, 'remove']);

// Shipping Address routes
Route::post('/shipping-address', [ShippingAddressController::class, 'store']);
Route::get('/shipping-address/{orderId}', [ShippingAddressController::class, 'show']);
Route::put('/shipping-address/{orderId}', [ShippingAddressController::class, 'update']);


Route::post('/paypal/create-order', [PayPalController::class, 'createOrder']);
Route::post('/paypal/capture-order', [PayPalController::class, 'captureOrder']);
Route::post('/paypal/verify-email', [PayPalController::class, 'verifyEmail']);



// News Routers

Route::resource('/news-articles',NewsArticleController::class);
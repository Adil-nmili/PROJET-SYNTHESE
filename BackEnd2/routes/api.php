<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
<<<<<<< HEAD

=======
>>>>>>> Nouhaila_ELANSARI

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
<<<<<<< HEAD
// nverifier nom et password wach homa li f database

Route::post('/login', [AdminController::class]);
=======


Route::post('/login', [AdminController::class,'store']);
// Route::apiressources([
//     AdminController::class,
// ]);
>>>>>>> Nouhaila_ELANSARI

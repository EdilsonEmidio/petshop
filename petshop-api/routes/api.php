<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signin_user', [UserController::class, 'cadastrarUser']);

Route::post('/login_user', [UserController::class, 'logarUser']);

Route::post('/logout_user', [UserController::class, 'logoutUser'])->middleware("auth:sanctum");

Route::get('/all_products',[HomeController::class, 'index'])->middleware('auth:sanctum');

Route::post('/search_products',[HomeController::class, 'search'])->middleware('auth:sanctum');

Route::post('/buy_product', [HomeController::class,'buy'])->middleware
('auth:sanctum');

Route::post('/your_products', [HomeController::class,'yourProducts'])->middleware
('auth:sanctum');

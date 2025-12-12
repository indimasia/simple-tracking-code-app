<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TrackingCodeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', ['title' => 'Script Tracking System']);
})->name('index');

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'loginForm'])->name('login.form');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::get('/register', [AuthController::class, 'registerForm'])->name('register.form');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::prefix('settings')->group(function () {
        Route::get('/scripts', [TrackingCodeController::class, 'index'])->name('scripts.index');
        Route::post('/scripts/create', [TrackingCodeController::class, 'store'])->name('scripts.store');
        Route::put('/scripts/update/{id}', [TrackingCodeController::class, 'update'])->name('scripts.update');
        Route::delete('/scripts/delete/{id}', [TrackingCodeController::class, 'destroy'])->name('scripts.delete');
    });

    Route::get('/customer', [CustomerController::class, 'index'])->name('customer.index');
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScriptController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', ['title' => 'Script Tracking System']);
});
Route::get('/scripts', [ScriptController::class, 'index'])->name('scripts.index');
Route::post('/scripts/create', [ScriptController::class, 'store'])->name('scripts.store');
Route::put('/scripts/update/{id}', [ScriptController::class, 'update'])->name('scripts.update');
Route::delete('/scripts/delete/{id}', [ScriptController::class, 'destroy'])->name('scripts.delete');
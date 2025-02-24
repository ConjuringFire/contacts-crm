<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::middleware(['api'])->group(function () {
    Route::post('/contacts', [ContactController::class, 'upsert']);
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/search', [ContactController::class, 'search']); // Search route FIRST
    Route::get('/contacts/{id}', [ContactController::class, 'show']); // Show route SECOND
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
    Route::post('/contacts/{id}/call', [ContactController::class, 'call']);
});
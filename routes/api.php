<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::middleware(['api'])->group(function () {
    Route::post('/contacts', [ContactController::class, 'upsert']);
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{id}', [ContactController::class, 'show']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
    Route::get('/contacts/search', [ContactController::class, 'search']);
    Route::post('/contacts/{id}/call', [ContactController::class, 'call']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'Test route works!']);
});
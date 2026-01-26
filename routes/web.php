<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ParticipantsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Raffle');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/items', function () {
    return Inertia::render('Items');
})->name('items');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Items API routes
    Route::prefix('api/items')
        ->name('items.')
        ->controller(ItemsController::class)
        ->group(function () {
            Route::post('/', 'addItems')->name('SaveItems');
            Route::get('show/items', 'showItem')->name('ShowItems');
            // Route::get('/{id}', 'show')->name('show');
            Route::put('/{id}', 'updateItems')->name('UpdateItems');
            Route::delete('/{id}', 'deleteItem')->name('DestroyItem');
        });

    // Participants API routes
    Route::prefix('api/participants')
        ->name('participants.')
        ->controller(ParticipantsController::class)
        ->group(function () {
            Route::post('/', 'store')->name('SaveParticipants');
            Route::get('show/participants', 'showParticipants')->name('ShowParticipants');
            Route::put('/{id}', 'updateParticipants')->name('UpdateParticipants');
            Route::delete('/{id}', 'deleteParticipant')->name('DestroyParticipant');
        });
});

require __DIR__.'/auth.php';

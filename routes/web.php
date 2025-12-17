<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

#### Test Inertia routes
# This is a shorthand. It's the same as Route::get(), but unable to run logic
Route::inertia('/about', 'About')->name('about');

# This is the full version of the above shorthand, which can include logic
Route::get('/test', function () {return Inertia::render('test');}) ->name('test');

Route::get('/login', function() {return Inertia::render('Auth/Login');})->name('login');
Route::get('/register', function() {return Inertia::render('Auth/Register');})->name('register');
Route::get('/tasks', function() {return Inertia::render('Tasks');})->name('tasks');
Route::get('/inventory', function() {return Inertia::render('Inventory');})->name('inventory');
####

require __DIR__.'/settings.php';

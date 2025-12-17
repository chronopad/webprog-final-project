<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\InventoryController;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::get('/', function () {
    return "Hello";
});


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

Route::get('/tasks/data', [TaskController::class, 'index'])->name('tasks.data');
Route::post('/tasks/{task}/toggle', [TaskController::class, 'toggle'])->name('tasks.toggle');
Route::get('/inventory/data', [InventoryController::class, 'index'])->name('inventory.data');

require __DIR__.'/settings.php';

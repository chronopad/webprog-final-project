<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\InventoryController;

Route::get('/', function () {
    return Auth::check() ? redirect()->route('tasks') : redirect()->route('register');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/tasks', function() {return Inertia::render('Tasks');})->name('tasks');
    Route::get('/inventory', function() {return Inertia::render('Inventory');})->name('inventory');
    Route::get('/tasks/data', [TaskController::class, 'data'])->name('tasks.data');
    Route::post('/tasks/{task}/complete', [TaskController::class, 'complete'])->name('tasks.complete');
    Route::get('/inventory/data', [InventoryController::class, 'data'])->name('inventory.data');
    Route::match(['get', 'post'], '/inventory/unlock', [InventoryController::class, 'unlock'])->name('inventory.unlock');
});

Route::get('/login', function() {return Inertia::render('Auth/Login');})->name('login');
Route::get('/register', function() {return Inertia::render('Auth/Register');})->name('register');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);

require __DIR__.'/settings.php';

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/employees', [EmployeeController::class, 'getAllEmployees'])->middleware(['auth', 'verified'])->name('employees');

Route::get('/create', [EmployeeController::class, 'create'])->middleware(['auth', 'verified'])->name('create');
Route::get('/departments/{department}/designations', [EmployeeController::class, 'getDesignations'])->middleware(['auth', 'verified'])->name('employees.designations');
Route::post('/store', [EmployeeController::class, 'store'])->middleware(['auth', 'verified'])->name('store');



require __DIR__.'/auth.php';

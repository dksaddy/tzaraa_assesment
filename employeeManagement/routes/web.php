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

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/employees', [EmployeeController::class, 'searchEmployees'])
        ->name('employees');

    Route::post('/employees', [EmployeeController::class, 'store'])
        ->name('employees.store');

    Route::put('/employees/{id}', [EmployeeController::class, 'update'])
        ->name('employees.update');

    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])
        ->name('employees.destroy');

    Route::get('/employees/create', [EmployeeController::class, 'create'])
        ->name('employees.create');

    Route::get(
        '/departments/{department_id}/designations',
        [EmployeeController::class, 'getDesignations']
    )->name('departments.designations');
});


require __DIR__ . '/auth.php';

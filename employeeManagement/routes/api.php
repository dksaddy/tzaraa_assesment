<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EmployeeController;

// Public login route for API clients
Route::post('/login', [AuthController::class, 'login']);

// Protected API routes using the JWT guard
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    // API route to get your employees
    Route::get('/employees', [EmployeeController::class, 'getAllEmployees']);
});

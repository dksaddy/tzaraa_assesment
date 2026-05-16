<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::get('/', [EmployeeController::class, 'getAllEmployees'])->name('employee.index');
Route::get('/add', [EmployeeController::class, 'create'])->name('employee.add');
Route::post('/add', [EmployeeController::class, 'store'])->name('employee.store');

Route::get('/get-designations/{department_id}', [EmployeeController::class, 'getDesignations'])->name('employee.designations');

Route::get('/employee/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');
Route::delete('/employee/delete/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');
Route::patch('/employee/bio/{id}', [EmployeeController::class, 'bioUpdate'])->name('employee.bioUpdate');

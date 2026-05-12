<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

// Route::get('/', function () {
    
//     return view('Dashboard.employee');
// });


Route::get('/',[EmployeeController::class,'getAllEmployees']);
Route::get('/search',[EmployeeController::class,'searchEmployees']);

Route::get('/add',[EmployeeController::class,'create'])->name('add');
Route::get('/get-designations/{department_id}', [EmployeeController::class, 'getDesignations']);
Route::post('/add', [EmployeeController::class, 'store'])->name('employee.store');

Route::get('/employee/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');

Route::delete('/employee/delete/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');

Route::fallback(function() {
    return view ('fallback');
});
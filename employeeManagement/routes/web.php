<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

// Route::get('/', function () {
    
//     return view('Dashboard.employee');
// });


Route::get('/',[EmployeeController::class,'getAllEmployees']);
<?php

namespace App\Http\Controllers;

use App\Models\Employee;

class EmployeeController extends Controller
{
    //
    public function getAllEmployees(){
        $employee = Employee::with('designation.department')->get();
        return view('employee.index', compact('employee'));
    }
}

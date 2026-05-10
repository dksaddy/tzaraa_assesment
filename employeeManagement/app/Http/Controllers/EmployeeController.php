<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Designation;
use App\Models\Department;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    //
    public function getAllEmployees()
    {
        $employee = Employee::with('designation.department')->get();
        $departments = Department::all(); 
        return view('employee.index', compact('employee', 'departments'));
    }

    public function searchEmployees(Request $request)
    {
        $search = $request->query('search');
        $deptId = $request->query('department_id');
        $status = $request->query('status');

        /*
        Line: 33. Without the with() method, if you tried to access $employee->designation->name in a loop, 
                  Laravel would run a new database query for every single employee.
        Line: 35: $search: checks is empty or not, use($search) for access the variable in the closure function.
        Line: 37: query,q --> store sql query. q -> add extra parentheses to group the OR conditions together.
        */

        $employee = Employee::with('designation.department')
            // Search Filter
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%")
                        ->orWhere('phone', 'like', "%$search%");
                });
            })
            // Department Filter (Searching through the designation relationship)
            ->when($deptId, function ($query) use ($deptId) {
                $query->whereHas('designation', function ($q) use ($deptId) {
                    $q->where('department_id', $deptId);
                });
            })
            // Status Filter
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->get();

        // You also need to pass departments to the view for the dropdown
        $departments = Department::all();

        return view('employee.index', compact('employee', 'departments'));
    }


    public function create()
    {
        $designations = Designation::all();
        return view('employee.add', compact('designations'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'required|email|unique:employee,email',
            'phone'          => 'required|unique:employee,phone',
            'designation_id' => 'required|exists:designation,id',
        ]);


        Employee::create($validated);

        return redirect('/')->with('success', 'Employee added successfully!');
    }


    
    public function edit($id)
    {
        $emp = Employee::findOrFail($id);
        $designations = Designation::all();
        return view('employee.edit', compact('emp', 'designations'));
    }

    
    public function update(Request $request, $id)
    {
        $emp = Employee::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employee,email,' . $id,
            'phone' => 'required',
            'designation_id' => 'required',
            'status' => 'required'
        ]);

        $emp->update($validated);
        return redirect('/')->with('success', 'Employee updated successfully!');
    }

    
    public function destroy($id)
    {
        $emp = Employee::findOrFail($id);
        $emp->delete();
        return redirect('/')->with('success', 'Employee deleted successfully!');
    }
}

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
        $employee = Employee::with(['designation', 'department'])->get();
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

        $employee = Employee::with('designation', 'department')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%")
                        ->orWhere('phone', 'like', "%$search%");
                });
            })
            ->when($deptId, function ($query) use ($deptId) {
                $query->where('department_id', $deptId);
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->get();

        $departments = Department::all();

        return view('employee.index', compact('employee', 'departments'));
    }


    public function create()
    {
        $departments = Department::all(); 
        return view('employee.add', compact('departments'));
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'required|email|unique:employee,email',
            'phone'          => 'required|unique:employee,phone',
            'department_id'  => 'required|exists:department,id', // Added validation
            'designation_id' => 'required|exists:designation,id',
            'status'         => 'required|in:active,inactive'
        ]);

        Employee::create($validated);
        return redirect('/')->with('success', 'Employee added successfully!');
    }


    public function edit($id)
    {
        $emp = Employee::findOrFail($id);
        $departments = Department::all();
        $designations = Designation::where('department_id', $emp->department_id)->get();
        return view('employee.edit', compact('emp', 'departments', 'designations'));
    }

    public function getDesignations($department_id) {
        $designations = Designation::where('department_id', $department_id)->get();
        return response()->json($designations);
    }


    public function update(Request $request, $id)
    {
        $emp = Employee::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employee,email,' . $id,
            'phone' => 'required',
            'designation_id' => 'required',
            'department_id' => 'required',
            'status' => 'required',
        ]);

        $emp->update($validated);
        return redirect('/')->with('success', 'Employee updated successfully!');
    }


    public function destroy($id)
    {
        try {
            $emp = Employee::findOrFail($id);
            $emp->delete();

            return response()->json([
                'success' => true,
                'message' => 'Employee deleted successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not find or delete employee.'
            ], 404);
        }
    }
}
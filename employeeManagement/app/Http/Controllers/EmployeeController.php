<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Designation;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    //
    public function getAllEmployees(Request $request)
    {
        $employee = Employee::with(['designation', 'department'])->get();
        //$departments = Department::all();

        // 2. If the request comes from Postman or an API client, return pure JSON data
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'employees' => $employee
            ]);
        }
        return Inertia::render('Employee/Index', [
            'employees' => $employee,
            //'departments' => $departments,
        ]);
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

        return Inertia::render('Employee/Index', [
            'employees' => $employee,
            'departments' => $departments,
            'filters' => [
                'search' => $search,
                'department_id' => $deptId,
                'status' => $status,
            ],
        ]);
    }


    public function create()
    {
        $departments = Department::all();
        return Inertia::render('Employee/Create', ['departments' => $departments]);
    }

    public function getDesignations($department_id)
    {
        if (!$department_id) {
            return response()->json([]);
        }

        $designations = Designation::where(
            'department_id',
            $department_id
        )->get();

        return response()->json($designations);
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
        return redirect()->route('employees')->with('success', 'Employee added successfully!');
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
        return redirect()->route('employees')->with('success', 'Employee updated successfully!');
    }


    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);

        $employee->delete();

        return redirect()
            ->route('employees')
            ->with('success', 'Employee deleted successfully!');
    }
}

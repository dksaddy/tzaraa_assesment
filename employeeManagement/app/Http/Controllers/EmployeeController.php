<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Designation;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    // Combined list and search for clean Inertia filtering
    public function getAllEmployees(Request $request)
    {
        $search = $request->query('search');
        $deptId = $request->query('department_id');
        $status = $request->query('status');

        $employees = Employee::with(['designation', 'department'])
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

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'departments' => Department::all(),
            'filters' => $request->only(['search', 'department_id', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Employee/Add', [
            'departments' => Department::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'required|email|unique:employee,email',
            'phone'          => 'required|unique:employee,phone',
            'department_id'  => 'required|exists:department,id',
            'designation_id' => 'required|exists:designation,id',
            'status'         => 'required|in:active,inactive'
        ]);

        Employee::create($validated);
        
        // Redirect to the named route instead of hardcoded URLs
        return redirect()->route('employee.index')->with('success', 'Employee added successfully!');
    }

    public function edit($id)
    {
        $emp = Employee::findOrFail($id);
        
        return Inertia::render('Employee/Edit', [
            'emp' => $emp,
            'departments' => Department::all(),
            // Pre-load current department's designations for the edit form
            'designations' => Designation::where('department_id', $emp->department_id)->get()
        ]);
    }

    // Still returns JSON for dynamic dependent dropdowns in React
    public function getDesignations($department_id) 
    {
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
            'designation_id' => 'required|exists:designation,id',
            'department_id' => 'required|exists:department,id',
            'status' => 'required|in:active,inactive',
        ]);

        $emp->update($validated);
        return redirect()->route('employee.index')->with('success', 'Employee updated successfully!');
    }

    public function destroy($id)
    {
        $emp = Employee::findOrFail($id);
        $emp->delete();

        // Redirect back instead of sending direct JSON responses
        return redirect()->back()->with('success', 'Employee deleted successfully!');
    }

    // Used for inline bio edits on the index page
    public function bioUpdate(Request $request, $id)
    {
        $emp = Employee::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employee,email,' . $id,
            'phone' => 'required',
        ]);

        $emp->update($validated);
        
        return redirect()->back()->with('success', 'Employee bio updated successfully!');
    }
}
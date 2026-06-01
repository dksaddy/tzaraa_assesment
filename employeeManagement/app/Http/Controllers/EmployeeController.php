<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use App\Models\Department;
use App\Models\Employee;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

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
        $filters = [
            'search'        => $request->query('search'),
            'department_id' => $request->query('department_id'),
            'status'        => $request->query('status'),
        ];

        $employees = $this->employeeService->getFilteredEmployees($filters);
        $departments = Department::all();

        return Inertia::render('Employee/Index', [
            'employees'   => $employees,
            'departments' => $departments,
            'filters'     => $filters,
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
            'department_id'  => 'required|exists:department,id',
            'designation_id' => 'required|exists:designation,id',
            'status'         => 'required|in:active,inactive'
        ]);

        $this->employeeService->createEmployee($validated);

        return redirect()->route('employees')->with('success', 'Employee added successfully!');
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'           => 'required',
            'email'          => 'required|email|unique:employee,email,' . $id,
            'phone'          => 'required',
            'designation_id' => 'required',
            'department_id'  => 'required',
            'status'         => 'required',
        ]);

        $this->employeeService->updateEmployee($id, $validated);

        return redirect()->route('employees')->with('success', 'Employee updated successfully!');
    }

    public function destroy($id)
    {
        $this->employeeService->deleteEmployee($id);

        return redirect()->route('employees')->with('success', 'Employee deleted successfully!');
    }
}

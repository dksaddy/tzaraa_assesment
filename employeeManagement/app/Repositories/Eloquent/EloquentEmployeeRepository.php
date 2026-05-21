<?php

namespace App\Repositories\Eloquent;

use App\Models\Employee;
use App\Repositories\Contracts\EmployeeRepositoryInterface;

class EloquentEmployeeRepository implements EmployeeRepositoryInterface
{
    public function search(array $filters)
    {
        $search = $filters['search'] ?? null;
        $deptId = $filters['department_id'] ?? null;
        $status = $filters['status'] ?? null;

        return Employee::with(['designation', 'department'])
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
    }

    public function store(array $data)
    {
        return Employee::create($data);
    }

    public function update($id, array $data)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($data);
        return $employee;
    }

    public function delete($id)
    {
        $employee = Employee::findOrFail($id);
        return $employee->delete();
    }
}

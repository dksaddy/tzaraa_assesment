<?php

namespace App\Services;

use App\Repositories\Contracts\EmployeeRepositoryInterface;

class EmployeeService
{
    protected $employeeRepo;

    public function __construct(EmployeeRepositoryInterface $employeeRepo)
    {
        $this->employeeRepo = $employeeRepo;
    }

    public function getFilteredEmployees(array $filters)
    {
        return $this->employeeRepo->search($filters);
    }

    public function createEmployee(array $data)
    {
        return $this->employeeRepo->store($data);
    }

    public function updateEmployee($id, array $data)
    {
        return $this->employeeRepo->update($id, $data);
    }

    public function deleteEmployee($id)
    {
        return $this->employeeRepo->delete($id);
    }
}

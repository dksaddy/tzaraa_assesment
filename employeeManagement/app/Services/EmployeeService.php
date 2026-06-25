<?php

namespace App\Services;

use App\Repositories\Contracts\EmployeeRepositoryInterface;
use App\Models\User;
use App\Notifications\EmployeeCreatedNotification;
use Illuminate\Support\Facades\Notification;

use Illuminate\Notifications\AnonymousNotifiable;
use App\Models\Employee;
use App\Notifications\EmployeeUpdatedNotification;

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
        // 1. Save the employee using your repository
        $employee = $this->employeeRepo->store($data);

        // 2. Fetch all system users who should get this notification
        $users = User::all();

        // 3. Send the notification to all of them
        Notification::send($users, new EmployeeCreatedNotification($employee->name));

        return $employee;
    }

    public function updateEmployee($id, array $data)
    {
        $employee = $this->employeeRepo->update($id, $data);

        Notification::route(
            'mail',
            'msadik193086@bscse.uiu.ac.bd'
        )->notify(
            new EmployeeUpdatedNotification($employee)
        );

        return $employee;
    }

    public function deleteEmployee($id)
    {
        return $this->employeeRepo->delete($id);
    }
}

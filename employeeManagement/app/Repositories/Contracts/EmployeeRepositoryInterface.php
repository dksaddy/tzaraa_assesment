<?php

namespace App\Repositories\Contracts;

interface EmployeeRepositoryInterface
{
    public function search(array $filters);
    public function store(array $data);
    public function update($id, array $data);
    public function delete($id);
}

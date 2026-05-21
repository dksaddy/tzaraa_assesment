<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\EmployeeRepositoryInterface;
use App\Repositories\Eloquent\EloquentEmployeeRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            EmployeeRepositoryInterface::class,
            EloquentEmployeeRepository::class
        );
    }

    public function boot(): void
    {
        //
    }
}

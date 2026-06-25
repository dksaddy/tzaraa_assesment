<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmployeeUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $employee;

    public function __construct($employee)
    {
        $this->employee = $employee;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Employee Updated')
            ->greeting('Hello!')
            ->line("Employee '{$this->employee->name}' has been updated.")
            ->line("Email: {$this->employee->email}")
            ->line("Phone: {$this->employee->phone}")
            ->line('Please review the latest employee information.')
            ->salutation('HR Management System');
    }
}
<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class EmployeeCreatedNotification extends Notification
{
    use Queueable;

    protected $employeeName;

    public function __construct($employeeName)
    {
        $this->employeeName = $employeeName;
    }

    public function via(object $notifiable): array
    {
        // You can easily add 'mail' or 'vonage' here later!
        return ['database']; 
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => "A new employee '{$this->employeeName}' has been added.",
            'time' => now()->toIso8601String(),
        ];
    }
}

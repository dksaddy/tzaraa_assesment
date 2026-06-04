<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class EmployeeCreatedNotification extends Notification implements ShouldQueue
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
        return ['database', 'broadcast']; 
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => "A new employee '{$this->employeeName}' has been added.",
            'time' => now()->toIso8601String(),
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'data' => [
                'message' => "A new employee '{$this->employeeName}' has been added.",
            ],
            'created_at' => now()->toISOString(),
            'read_at' => null,
        ]);
    }
}

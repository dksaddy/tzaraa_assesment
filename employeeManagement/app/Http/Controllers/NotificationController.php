<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function markAsRead(
    Request $request,
    string $notificationId
) {
    $notification = DatabaseNotification::findOrFail(
        $notificationId
    );

    if (
        $notification->notifiable_id !==
        $request->user()->id
    ) {
        abort(403);
    }

    $notification->markAsRead();

    return response()->json([
        'success' => true,
    ]);
}

    public function markAllAsRead(Request $request)
    {
        $request->user()
            ->unreadNotifications
            ->markAsRead();

        return response()->json([
            'success' => true,
        ]);
    }
}
<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject; // 1. Import the JWT interface

class User extends Authenticatable implements JWTSubject // 2. Implement the interface
{
    use HasFactory, Notifiable, HasApiTokens;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // 3. Add this method to get the user ID for the token
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // 4. Add this method to pass any custom data into the token payload (leave empty for now)
    public function getJWTCustomClaims()
    {
        return [];
    }
}

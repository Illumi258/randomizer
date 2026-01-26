<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class BaseService
{
    protected $user;

    public function __construct()
    {
        $this->user = auth()->id(); // automatic assign
    }

    protected function isAuthenticated(): bool
    {
        return !is_null($this->user);
    }

    protected function authFailResponse(): array {
        return [
            'success' => false,
            'message' => 'User not authenticated',
            'data' => []
        ];
    }
}

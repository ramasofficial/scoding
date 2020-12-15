<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\LoginService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterUserRequest;

class AuthController extends Controller
{
    public function login(LoginService $service, Request $request)
    {
        $request = $service->login($request);
        return $request;
    }

    public function register(RegisterUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        return User::create($validated);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully.', 200);
    }
}

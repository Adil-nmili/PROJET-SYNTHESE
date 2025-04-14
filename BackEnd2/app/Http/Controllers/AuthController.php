<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the incoming data
        $fields = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'matricule' => 'required|string|max:255',  // Add any extra fields
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'role' => 'required|in:client,admin',
        ]);

        // Create the user
        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']), // Hash the password
            'matricule' => $fields['matricule'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'city' => $fields['city'],
            'country' => $fields['country'],
            'postal_code' => $fields['postal_code'],
            'role' => $fields['role'],  // You can customize the role here
        ]);

        // Create an API token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user and token as JSON response
        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        // Validate the incoming data
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find the user by email
        $user = User::where('email', $fields['email'])->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => ['Invalid credentials']]);
        }

        // Generate a new API token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user and token as JSON response
        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the user's tokens (log them out)
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}

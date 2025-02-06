<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Retrieve the email and password from the request
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        // Attempt to authenticate the user with JWTAuth
        if (!$token) {
            // If authentication fails, return an unauthorized response
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Retrieve the authenticated user
        $user = JWTAuth::user();

        // Check if the user is verified
        if (!$user->is_verified) {
            // If the user is not verified, return a warning
            return response()->json(['warning' => 'User is not verified'], 403);
        }
       $role = $user->role;

        // Generate the JWT token with additional claims
        $customClaims = [
            'role' => $role,
            'email' => $user->email
            // Add more custom claims as needed
        ];

        $token = JWTAuth::claims($customClaims)->attempt($credentials);


        // If authentication is successful, return the token and additional details in the response
        return response()->json([
            'token' => $token,
            'is_verified' => $user->is_verified,
            'role' => $user->role
        ]);
    }

    public function adminlogin(Request $request)
    {
        // Retrieve the email and password from the request
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        // Attempt to authenticate the user with JWTAuth
        if (!$token) {
            // If authentication fails, return an unauthorized response
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Retrieve the authenticated user
        $user = JWTAuth::user();

        // Check if the user is verified
        if ($user->role != 'ADMIN' ) {
            // If the user is not verified, return a warning
            return response()->json(['error' => 'User is not Admin'], 401);
        }
       $role = $user->role;

        // Generate the JWT token with additional claims
        $customClaims = [
            'role' => $role,
            'email' => $user->email
            // Add more custom claims as needed
        ];

        $token = JWTAuth::claims($customClaims)->attempt($credentials);


        // If authentication is successful, return the token and additional details in the response
        return response()->json([
            'token' => $token,
            'is_verified' => $user->is_verified,
            'role' => $user->role
        ]);
    }
}

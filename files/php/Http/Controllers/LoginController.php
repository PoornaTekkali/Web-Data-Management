<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use App\Models\Setting;

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
        if (!$user->is_verified ) {
            // If the user is not verified, return a warning
            return response()->json(['error' => 'User is not verified'], 403);
        }

        if (!$user->is_active ) {
            // If the user is not verified, return a warning
            return response()->json(['error' => 'User Account is not Active'], 403);
        }

        if ($user->role == 'ADMIN' ) {
            // If the user is not verified, return a warning
            return response()->json(['error' => 'Unauthorized'], 401);
        }
       $role = $user->role;

        // Generate the JWT token with additional claims
        $customClaims = [
            'role' => $role,
            'email' => $user->email
            // Add more custom claims as needed
        ];

        $token = JWTAuth::claims($customClaims)->attempt($credentials);


        $response = response()->json([
        'token' => $token,
        'name' => $user->firstname,
        'is_verified' => $user->is_verified,
        'role' => $user->role
        ]);

        // Set the token as a cookie in the response
        $cookie = Cookie::make('jwt_token', $token, 60); // Adjust the expiry time as needed
        $response->withCookie($cookie);

        return $response;
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

        $Settings = Setting::first();

        // Check if the user is verified
        if ($user->role != 'ADMIN' ) {
            // If the user is not verified, return a warning
            return response()->json(['error' => 'Unauthorized'], 401);
        }
       $role = $user->role;

        // Generate the JWT token with additional claims
        $customClaims = [
            'role' => $role,
            'email' => $user->email
            // Add more custom claims as needed
        ];

        $token = JWTAuth::claims($customClaims)->attempt($credentials, ['ttl' => $Settings->tokenExpiration]);

        //$token = JWTAuth::claims($customClaims)->attempt($credentials);


        $response = response()->json([
        'token' => $token,
        'name' => $user->firstname,
        'is_verified' => $user->is_verified,
        'role' => $user->role
        ]);

        // Set the token as a cookie in the response
        $cookie = Cookie::make('jwt_token', $token, $Settings->tokenExpiration); // Adjust the expiry time as needed
        $response->withCookie($cookie);

        return $response;
    }
}

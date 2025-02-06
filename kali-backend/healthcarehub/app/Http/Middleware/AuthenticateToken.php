<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Attempt to authenticate the user using the JWT token
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                // If user authentication fails, return an unauthorized response
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // If the user is authenticated, attach the user object to the request
            $request->merge(['user' => $user]);
        } catch (\Exception $e) {
            // If an exception occurs (e.g., token expired or invalid), return an unauthorized response
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}



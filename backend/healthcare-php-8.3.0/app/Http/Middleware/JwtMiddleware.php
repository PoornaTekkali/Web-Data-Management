<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            // Attempt to parse and authenticate the JWT token
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            // Handle token verification failure
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Token verification successful, proceed with the request
        return $next($request);
    }
}
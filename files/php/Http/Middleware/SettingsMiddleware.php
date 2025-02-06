<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;

use Closure;
use App\Models\Setting; // Assuming your settings model is named Settings

class SettingsMiddleware
{
    public function handle($request, Closure $next, $column)
    {
        try {
            // Fetch the settings and check if the specified column is enabled
            $settings = Setting::first();
            if ($settings && $settings->$column == 1) {
                return $next($request);
            } else {
                // Column not enabled, return unauthorized response
                return response()->json(['error' => 'Unauthorized' , "message" => $column .' is False'], 403);
            }
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}

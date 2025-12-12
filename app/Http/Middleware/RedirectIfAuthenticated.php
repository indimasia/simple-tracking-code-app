<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * The authentication guard factories.
     *
     * @var string[]
     */
    protected $guards = [];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (auth()->guard($guard)->check()) {
                // User sudah login, redirect ke dashboard
                return redirect()->route('customer.index');
            }
        }

        return $next($request);
    }
}
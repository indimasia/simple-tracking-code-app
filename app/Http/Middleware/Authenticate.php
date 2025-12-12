<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
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
        if (!$this->authenticate($request, $guards)) {
            return redirect()->route('login.form');
        }

        return $next($request);
    }

    /**
     * Determine if the user is logged in to any of the given guards.
     */
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth()->guard($guard)->check()) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the authentication instance.
     */
    protected function auth()
    {
        return auth();
    }
}
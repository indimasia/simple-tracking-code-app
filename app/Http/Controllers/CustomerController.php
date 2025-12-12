<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\TrackingCode;
class CustomerController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $scripts = TrackingCode::where('user_id', $user_id)->get();
        return Inertia::render('Customer/Index', ['title' => 'Customer', 'user_id' => $user_id, 'scripts' => $scripts]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TrackingCode;
use Illuminate\Support\Facades\Auth;
class TrackingCodeController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $scripts = TrackingCode::where('user_id', $user_id)->get();
        return Inertia::render('Scripts/Index', ['title' => 'Script Tracking System', 'scripts' => $scripts, 'user_id' => $user_id]);
    }

    public function store(Request $request)
    {
        // $consent = Cookie::get('cc_cookie');
        // // $consent = json_decode(urldecode($request->cookie('cc_cookie')), true);
        // dd($consent);
        $request->validate([
            'name' => 'required|string|max:255',
            'script' => 'required|string',
            'user_id' => 'required|integer',
        ]);

        $data = [
            'name' => $request->name,
            'script' => json_encode($request->script),
            'is_success' => $request->is_success,
            'user_id' => $request->user_id,
        ];
        TrackingCode::create($data);
        return redirect()->route('scripts.index');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'script' => 'required|string',
        ]);

        $data = [
            'name' => $request->name,
            'script' => json_encode($request->script),
            'is_success' => $request->is_success,
        ];
        $script = TrackingCode::find($id);
        $script->update($data);
        return redirect()->route('scripts.index');
    }

    public function destroy($id)
    {
        $script = TrackingCode::find($id);
        $script->delete();
        return redirect()->route('scripts.index');
    }
}

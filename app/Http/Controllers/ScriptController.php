<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Script;

class ScriptController extends Controller
{
    public function index()
    {
        $scripts = Script::all();
        return Inertia::render('Scripts/Index', ['title' => 'Script Tracking System', 'scripts' => $scripts]);
    }

    public function store(Request $request)
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
        Script::create($data);
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
        $script = Script::find($id);
        $script->update($data);
        return redirect()->route('scripts.index');
    }

    public function destroy($id)
    {
        $script = Script::find($id);
        $script->delete();
        return redirect()->route('scripts.index');
    }
}

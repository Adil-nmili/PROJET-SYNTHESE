<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();
        return response()->json($teams);
    }

    /**
     * Show the form for creating a new resource.
     */
   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'biography' => 'required',
            'image' => 'required',
        ]);
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('Teams'), $imageName);
            $validated['image'] = 'Teams/'. $imageName;
        }
        $team = Team::create($validated);
        return response()->json($team);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $team = Team::find($id);
        return response()->json($team);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $team = Team::find($id);
        return response()->json($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        $validated = $request->validate([
            'name' => 'required',
            'biography' => 'required',
            'image' => 'required',
        ]);
        if($request->hasFile('image')){
            $image = $request->file('image');
            if($team->image && Storage::disk('public')->exists($team->image)){
                Storage::disk('public')->delete($team->image);
            }
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('Teams'), $imageName);
            $validated['image'] = 'Teams/'. $imageName;
        }
        $team->update($validated);
        return response()->json($team);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $team = Team::find($id);
        if($team->image && Storage::disk('public')->exists($team->image)){
            Storage::disk('public')->delete($team->image);
        }
        $team->delete();
        return response()->json($team);
    }
}

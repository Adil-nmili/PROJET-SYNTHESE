<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlayersController extends Controller
{
    public function index()
    {
        $players = Player::all();
        return response()->json($players);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'nickname' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'championships' => 'required',
            'image' => 'nullable',
        ]);
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('Players'), $imageName);
            $validated['image'] = 'Players/'. $imageName;
        }
        $player = Player::create($validated);
        return response()->json($player);
    }
    
    public function update(Request $request, $id)
    {
        $player = Player::find($id);
        $validated = $request->validate([
            'full_name' => 'required',
            'birth_date' => 'required',
            'birth_place' => 'required',
            'nickname' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'championships' => 'required',
            'image' => 'nullable',
        ]);
        if($request->hasFile('image')){
            $image = $request->file('image');
            if($player->image && Storage::disk('public')->exists($player->image)){
                Storage::disk('public')->delete($player->image);
            }
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('Players'), $imageName);
            $validated['image'] = 'Players/'. $imageName;
        }
        $player->update($validated);
        return response()->json($player);
    }
    public function destroy($id)
    {
        $player = Player::find($id);
       
        if ($player->image && Storage::disk('public')->exists($player->image)) {
            Storage::disk('public')->delete($player->image);
        }
        $player->delete();
        return response()->json($player);
    }
    public function show($id)
    {
        $player = Player::find($id);
        return response()->json($player);
    }

    
}

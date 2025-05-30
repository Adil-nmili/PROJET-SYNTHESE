<?php

namespace App\Http\Controllers;

use App\Models\PlayerStats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PlayerStatsController extends Controller
{
    public function store(Request $request)
    {
        try {
            Log::info('Received player stats data:', $request->all());

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'team' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'description' => 'nullable|string',
                'points' => 'required|integer|min:0',
                'rebounds' => 'required|integer|min:0',
                'assists' => 'required|integer|min:0'
            ]);

            // Handle image upload
            $imagePath = $request->file('image')->store('player-images', 'public');

            $playerStats = PlayerStats::create([
                'name' => $validated['name'],
                'team' => $validated['team'],
                'position' => $validated['position'],
                'image' => $imagePath,
                'description' => $validated['description'] ?? null,
                'points' => $validated['points'],
                'rebounds' => $validated['rebounds'],
                'assists' => $validated['assists'],
                'user_id' => Auth::id() ?? 1
            ]);

            Log::info('Player stats created successfully:', ['id' => $playerStats->id]);

            return response()->json([
                'success' => true,
                'message' => 'Player stats created successfully',
                'data' => $playerStats
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating player stats:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create player stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $playerStats = PlayerStats::with('createdBy')->get();
            return response()->json($playerStats);
        } catch (\Exception $e) {
            Log::error('Error fetching player stats:', [
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch player stats'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $playerStats = PlayerStats::with('createdBy')->findOrFail($id);
            return response()->json($playerStats);
        } catch (\Exception $e) {
            Log::error('Error fetching player stats:', [
                'error' => $e->getMessage(),
                'id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch player stats'
            ], 500);
        }
    }
}
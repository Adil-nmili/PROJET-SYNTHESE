<?php

namespace App\Http\Controllers;

use App\Models\MatchCalendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MatchCalendarController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'league' => 'required|string',
                'home_team' => 'required|string',
                'away_team' => 'required|string',
                'home_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'away_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'match_date' => 'required|date',
                'venue' => 'nullable|string',
                'status' => 'required|string|in:scheduled,live,completed,postponed',
                'description' => 'nullable|string',
            ]);

            $data = $validated;
            $data['user_id'] = Auth::id();

            // Handle home team logo upload
            if ($request->hasFile('home_logo')) {
                $homeLogoPath = $request->file('home_logo')->store('team-logos', 'public');
                $data['home_logo'] = $homeLogoPath;
            }

            // Handle away team logo upload
            if ($request->hasFile('away_logo')) {
                $awayLogoPath = $request->file('away_logo')->store('team-logos', 'public');
                $data['away_logo'] = $awayLogoPath;
            }

            $matchCalendar = MatchCalendar::create($data);

            return response()->json([
                'message' => 'Match calendar created successfully',
                'data' => $matchCalendar
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating match calendar: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating match calendar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $matches = MatchCalendar::with('createdBy')
                ->orderBy('match_date', 'asc')
                ->get();

            return response()->json($matches);
        } catch (\Exception $e) {
            Log::error('Error fetching match calendars: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching match calendars',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $match = MatchCalendar::with('createdBy')->findOrFail($id);
            return response()->json($match);
        } catch (\Exception $e) {
            Log::error('Error fetching match calendar: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching match calendar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $match = MatchCalendar::findOrFail($id);

            $validated = $request->validate([
                'league' => 'required|string',
                'home_team' => 'required|string',
                'away_team' => 'required|string',
                'home_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'away_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'match_date' => 'required|date',
                'venue' => 'nullable|string',
                'status' => 'required|string|in:scheduled,live,completed,postponed',
                'description' => 'nullable|string',
            ]);

            $data = $validated;

            // Handle home team logo upload
            if ($request->hasFile('home_logo')) {
                // Delete old logo if exists
                if ($match->home_logo) {
                    Storage::disk('public')->delete($match->home_logo);
                }
                $homeLogoPath = $request->file('home_logo')->store('team-logos', 'public');
                $data['home_logo'] = $homeLogoPath;
            }

            // Handle away team logo upload
            if ($request->hasFile('away_logo')) {
                // Delete old logo if exists
                if ($match->away_logo) {
                    Storage::disk('public')->delete($match->away_logo);
                }
                $awayLogoPath = $request->file('away_logo')->store('team-logos', 'public');
                $data['away_logo'] = $awayLogoPath;
            }

            $match->update($data);

            return response()->json([
                'message' => 'Match calendar updated successfully',
                'data' => $match
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating match calendar: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating match calendar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $match = MatchCalendar::findOrFail($id);

            // Delete team logos if they exist
            if ($match->home_logo) {
                Storage::disk('public')->delete($match->home_logo);
            }
            if ($match->away_logo) {
                Storage::disk('public')->delete($match->away_logo);
            }

            $match->delete();

            return response()->json([
                'message' => 'Match calendar deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting match calendar: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error deleting match calendar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
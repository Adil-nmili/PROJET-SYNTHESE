<?php

namespace App\Http\Controllers;

use App\Models\MatchResults;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NewsArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = NewsArticle::with('createdBy')->get();
        return response()->json($articles, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Debug incoming data
            \Log::info('Incoming request data:', $request->all());

            $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'required|exists:users,id',
                'content' => 'required|string',
                'videoUrl' => 'required|string', // Removed URL validation temporarily
                'images' => 'required|array', 
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $imagePaths = [];
            
            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('news'), $filename);
                    $imagePaths[] = 'news/' . $filename;
                }
            }

            $article = NewsArticle::create([
                'title' => $request->title,
                'author' => $request->author,
                'content' => $request->content,
                'date' => $request->date ? date('Y-m-d', strtotime($request->date)) : date('Y-m-d'),
                'video_url' => $request->videoUrl,
                'images' => json_encode($imagePaths)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Article created successfully',
                'data' => $article
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Article creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error creating article: ' . $e->getMessage(),
                'debug' => [
                    'request_data' => $request->all(),
                    'error' => $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(NewsArticle $newsArticle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NewsArticle $newsArticle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NewsArticle $newsArticle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NewsArticle $newsArticle)
    {
        //
    }
    public function createMatch(Request $request)
    {
        try {
            Log::info('Received match data:', $request->all());

            $validated = $request->validate([
                'league' => 'required|string',
                'status' => 'required|string',
                'homeTeam' => 'required|string',
                'homeLogo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'homeScore' => 'required|integer',
                'awayTeam' => 'required|string',
                'awayLogo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'awayScore' => 'required|integer',
                'replayLink' => 'nullable|string',
                'homeTeamStats' => 'required|string',
                'awayTeamStats' => 'required|string'
            ]);

            Log::info('Validated data:', $validated);

            // Handle team logo uploads
            $homeLogoPath = $request->file('homeLogo')->store('team-logos', 'public');
            $awayLogoPath = $request->file('awayLogo')->store('team-logos', 'public');

            // Process player stats
            $homeTeamStats = json_decode($validated['homeTeamStats'], true);
            $awayTeamStats = json_decode($validated['awayTeamStats'], true);

            // Process player images if they are base64 encoded
            foreach ($homeTeamStats as &$player) {
                if (isset($player['image']) && strpos($player['image'], 'data:image') === 0) {
                    $imageData = explode(',', $player['image'])[1];
                    $imageData = base64_decode($imageData);
                    $filename = 'player-' . uniqid() . '.jpg';
                    Storage::disk('public')->put('player-images/' . $filename, $imageData);
                    $player['image'] = 'player-images/' . $filename;
                }
            }

            foreach ($awayTeamStats as &$player) {
                if (isset($player['image']) && strpos($player['image'], 'data:image') === 0) {
                    $imageData = explode(',', $player['image'])[1];
                    $imageData = base64_decode($imageData);
                    $filename = 'player-' . uniqid() . '.jpg';
                    Storage::disk('public')->put('player-images/' . $filename, $imageData);
                    $player['image'] = 'player-images/' . $filename;
                }
            }

            $matchData = [
                'league' => $validated['league'],
                'status' => $validated['status'],
                'homeTeam' => $validated['homeTeam'],
                'homeImage' => $homeLogoPath,
                'homeScore' => $validated['homeScore'],
                'awayTeam' => $validated['awayTeam'],
                'awayImage' => $awayLogoPath,
                'awayScore' => $validated['awayScore'],
                'replayLink' => $validated['replayLink'] ?? null,
                'homeTeamStats' => json_encode($homeTeamStats),
                'awayTeamStats' => json_encode($awayTeamStats),
                'user_id' => Auth::id() ?? 1
            ];

            Log::info('Prepared match data:', $matchData);

            $matchResult = MatchResults::create($matchData);

            Log::info('Match created successfully:', ['id' => $matchResult->id]);

            return response()->json([
                'success' => true,
                'message' => 'Match result created successfully',
                'data' => $matchResult
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating match:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create match result',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

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
}

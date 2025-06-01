<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();

            if ($request->hasFile('image')) {
                // Store in storage/app/public/categories
                $path = $request->file('image')->store('categories', 'public');
                $data['image'] = $path;
            }

            $categorie = Categorie::create($data);
            return response()->json($categorie, 200);
        } catch (\Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $categorie = Categorie::findOrFail($id);
        return response()->json($categorie);
    }

    public function edit(Categorie $categorie)
    {
        //
    }

    public function update(Request $request, $id)
    {
        try {
            $categorie = Categorie::findOrFail($id);
            $data = $request->all();
            return response()->json($data);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($categorie->image && Storage::disk('public')->exists($categorie->image)) {
                    Storage::disk('public')->delete($categorie->image);
                }

                // Store new image in storage/app/public/categories
                $path = $request->file('image')->store('categories', 'public');
                $data['image'] = $path;
            }

            $categorie->update($data);
            return response()->json([
                'message' => 'Category updated successfully',
                'category' => $data
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);

        if ($categorie->image && Storage::disk('public')->exists($categorie->image)) {
            Storage::disk('public')->delete($categorie->image);
        }

        $categorie->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}

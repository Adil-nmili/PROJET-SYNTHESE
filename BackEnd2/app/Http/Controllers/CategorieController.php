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
        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public'); 
            $data['image'] = $path; 
        }

        $categorie = Categorie::create($data);
        return response()->json($categorie, 200);
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

    public function update(Request $request, string $id)
    {
    return $request->all();
        try {
            // Log the incoming request data
            Log::info('Update request data:', $request->all());

            $categorie = Categorie::findOrFail($id);
            
            // Log the current category data
            Log::info('Current category data:', $categorie->toArray());

            // Get all data except image
            $data = $request->except('image');
            
            // Log the data to be updated
            Log::info('Data to be updated:', $data);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($categorie->image && Storage::disk('public')->exists($categorie->image)) {
                    Storage::disk('public')->delete($categorie->image);
                }

                // Store new image
                $path = $request->file('image')->store('images', 'public');
                $data['image'] = $path;
            } else {
                // Keep existing image if no new image is provided
                $data['image'] = $categorie->image;
            }

            // Log the final data before update
            Log::info('Final data to be updated:', $data);

            // Update the category
            $updated = $categorie->update($data);

            // Log the update result
            Log::info('Update result:', ['success' => $updated]);

            if (!$updated) {
                throw new \Exception('Failed to update category');
            }

            // Refresh the model to get the latest data
            $categorie->refresh();

            // Log the updated category data
            Log::info('Updated category data:', $categorie->toArray());

            return response()->json([
                'message' => 'Category updated successfully',
                'category' => $categorie
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

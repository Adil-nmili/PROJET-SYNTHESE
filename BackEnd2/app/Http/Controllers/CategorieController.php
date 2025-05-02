<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('image')) {
            // First, delete old image if exists
            if ($categorie->image && Storage::disk('public')->exists($categorie->image)) {
                Storage::disk('public')->delete($categorie->image);
            }

            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }

        $categorie->update($data);

        return response()->json($categorie);
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

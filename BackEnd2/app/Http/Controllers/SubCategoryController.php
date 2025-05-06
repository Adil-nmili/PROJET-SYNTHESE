<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::with('category')->get();
        return response()->json($subCategories);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }

        $subCategory = SubCategory::create($data);
        return response()->json($subCategory, 200);
    }

    public function show($id)
    {
        $subCategory = SubCategory::with('category')->findOrFail($id);
        return response()->json($subCategory);
    }

    public function update(Request $request, $id)
    {
        $subCategory = SubCategory::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($subCategory->image && Storage::disk('public')->exists($subCategory->image)) {
                Storage::disk('public')->delete($subCategory->image);
            }

            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }

        $subCategory->update($data);
        return response()->json($subCategory);
    }

    public function destroy($id)
    {
        $subCategory = SubCategory::findOrFail($id);

        if ($subCategory->image && Storage::disk('public')->exists($subCategory->image)) {
            Storage::disk('public')->delete($subCategory->image);
        }

        $subCategory->delete();
        return response()->json(['message' => 'Sub-category deleted successfully']);
    }

    public function getByCategory($categoryId)
    {
        $subCategories = SubCategory::where('category_id', $categoryId)->get();
        return response()->json($subCategories);
    }
} 
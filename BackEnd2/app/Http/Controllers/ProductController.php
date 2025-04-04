<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['categorie'])->get();
        return response()->json($products);
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
        $validatedData = $request->validate([
            'product_code' => 'required|integer|unique:products',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'sizes' => 'nullable|array',
            'colors' => 'nullable|array',
            'images' => 'nullable|array', // Validate that images is an array
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagesPath = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {
                    $path = $image->store('product_images', 'public'); // Store in storage/app/public/product_images
                    $imagesPath[] = 'storage/' . $path;
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
                }
            }
        }

        $product = Product::create([
            'product_code' => $validatedData['product_code'],
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
            'category_id' => $validatedData['category_id'],
            'sizes' => json_encode($validatedData['sizes']),
            'colors' => json_encode($validatedData['colors']),
            'images' => json_encode($imagesPath),
        ]);

        return response()->json(['message' => 'Product created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $product)
    {
        $product = Product::findOrFail($product);
        
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}

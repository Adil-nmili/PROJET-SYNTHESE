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
    public function index(Request $request)
    {
        $query = Product::with(['categorie'])->latest();
    
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where('name', 'like', '%' . $search . '%');
        }
    
        $products = $query->get();
    
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
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'sizes' => 'nullable|string', // Will be JSON string
            'colors' => 'nullable|string', // Will be JSON string
            'existing_images' => 'nullable|string', // Will be JSON string
            'images' => 'nullable|array', // New images
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Process existing images
        $existingImages = [];
        if ($request->has('existing_images')) {
            $existingImages = json_decode($request->existing_images, true) ?? [];
        }

        // Process new images
        $newImagesPath = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {
                    $path = $image->store('product_images', 'public');
                    $newImagesPath[] = 'storage/' . $path;
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
                }
            }
        }

        // Combine existing and new images
        $allImages = array_merge($existingImages, $newImagesPath);

        // Prepare update data
        $updateData = [];
        
        // Only include fields that were provided in the request
        if ($request->has('name')) $updateData['name'] = $validatedData['name'];
        if ($request->has('description')) $updateData['description'] = $validatedData['description'];
        if ($request->has('price')) $updateData['price'] = $validatedData['price'];
        if ($request->has('quantity')) $updateData['quantity'] = $validatedData['quantity'];
        if ($request->has('category_id')) $updateData['category_id'] = $validatedData['category_id'];
        if ($request->has('sizes')) $updateData['sizes'] = $validatedData['sizes'];
        if ($request->has('colors')) $updateData['colors'] = $validatedData['colors'];
        
        // Always update images if we have any
        if (!empty($allImages)) {
            $updateData['images'] = json_encode($allImages);
        }

        // Update the product
        $product->update($updateData);

        return response()->json(['message' => 'Product updated successfully', 'data' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}

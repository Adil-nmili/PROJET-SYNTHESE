<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorie = Categorie::all();
        return response()->json($categorie);
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
        $categorie = Categorie::create($request->all());
        return response()->json($categorie, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($categorie)
    {
        $get_categorie = Categorie::findOrFail($categorie);
        return response()->json($get_categorie);
    }   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $categorie)
    {
        $categorie = Categorie::findOrFail($categorie);
        $categorie->update($request->all());
        return response()->json($categorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $categorie)
    {
        $categorie = Categorie::findOrFail($categorie);
        $categorie->delete();
        return response()->json(['message' => 'Categorie deleted successfully']);
    }
}

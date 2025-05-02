<?php

namespace App\Http\Controllers;

use App\Models\SousCategorie;
use Illuminate\Http\Request;

class SousCategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $souscategorie = SousCategorie::with(['categories'])->get();
        return response()->json($souscategorie);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $souscategorie = SousCategorie::create($request->all());
        return response()->json($souscategorie);
    }

    public function show( $sousCategorie)
    {
        $get_souscategorie = Categorie::findOrFail($sousCategorie);
        return response()->json($get_souscategorie);
    }

    public function edit(SousCategorie $sousCategorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SousCategorie $sousCategorie)
    {
        $sousCategorie = SousCategorie::findOrFail($sousCategorie);
        $sousCategorie->update($request->all());
        return response()->json($sousCategorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SousCategorie $sousCategorie)
    {
        $sousCategorie = SousCategorie::findOrFail($sousCategorie);
        $sousCategorie->delete();
        return response()->json(['message' => 'Categorie deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function login(Request $request){
        $request->validate([
            'identifier' => 'required',
            'password' => 'required'
        ]);
    
        // Recherche l'admin par email ou matricule
        $admin = Admin::where('email', $request->identifier)
                      ->orWhere('name', $request->identifier)
                      ->first();
    
        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['error' => 'Identifiants incorrects'], 401);
        }
    
        // Générer un token
        $token = $admin->createToken('authToken')->plainTextToken;
    
        return response()->json(['message' => 'Connexion réussie', 'token' => $token, 'admin' => $admin]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

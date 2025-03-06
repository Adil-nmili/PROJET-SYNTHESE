<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
=======
use App\Models\Admin;
>>>>>>> Nouhaila_ELANSARI
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
<<<<<<< HEAD
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
=======
>>>>>>> Nouhaila_ELANSARI

    /**
     * Show the form for creating a new resource.
     */
<<<<<<< HEAD
    public function create()
    {
        //
=======
    public function create(Request $request)
    {
         return response()->json('hello world', 200);
>>>>>>> Nouhaila_ELANSARI
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
<<<<<<< HEAD
    public function show(string $id)
=======
    public function show(Admin $admin)
>>>>>>> Nouhaila_ELANSARI
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
<<<<<<< HEAD
    public function edit(string $id)
=======
    public function edit(Admin $admin)
>>>>>>> Nouhaila_ELANSARI
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
<<<<<<< HEAD
    public function update(Request $request, string $id)
=======
    public function update(Request $request, Admin $admin)
>>>>>>> Nouhaila_ELANSARI
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
<<<<<<< HEAD
    public function destroy(string $id)
=======
    public function destroy(Admin $admin)
>>>>>>> Nouhaila_ELANSARI
    {
        //
    }
}

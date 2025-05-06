<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = User::all();
        return response()->json($admins);
    }

 
    /**
     * Store a newly created resource in storage.
     */
    public function verifie(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        return response()->json(['user' => $user, 'token' => $user->createToken('token')->plainTextToken]);
    }

    
    public function store(Request $request)
    {


        $admin = User::create($request->all());
        return response()->json($admin);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = User::findorFail($id);
        return response()->json($admin);
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        $admin = User::findorFail($id);
        $admin->update($request->all());
        return response()->json($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = User::findorFail($id);
        $admin->delete();
        return response()->json(['message' => 'Admin ' . $admin->first_name . ' ' . $admin->last_name    . ' deleted successfully']);
    }
}

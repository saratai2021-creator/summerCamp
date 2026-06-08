<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function register(Request $request)
{
    $request->validate([

        'nom' => 'required|string',
        'prenom' => 'required|string',

        'date_naissance' => 'required|date',

        'parent_telephone' => 'required|string',

        'parent_email' => 'required|email|unique:etudiants,parent_email',

        'parent_password' => 'required|min:6|confirmed'
    ]);

    $user = User::create([
          'name' => $request->nom . ' ' . $request->prenom,
        'email' => $request->parent_email,
        'password' => bcrypt($request->parent_password),
        'role' => 'parent'
    ]);

    $etudiant = Etudiant::create([

        'user_id' => $user->id,

        'nom' => $request->nom,

        'prenom' => $request->prenom,

        'date_naissance' => $request->date_naissance,

        'parent_telephone' => $request->parent_telephone,

        'parent_email' => $request->parent_email,

        'parent_password' => bcrypt($request->parent_password)
    ]);
$token = $user->createToken('api-token')->plainTextToken;
    return response()->json([

        'message' => 'Register successful',

        'user' => $user,
          'token'=>$token,
        'etudiant' => $etudiant

    ], 201);
}


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}

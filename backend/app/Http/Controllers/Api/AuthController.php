<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
//SELECT * FROM users WHERE email = ?
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Access denied'
            ], 403);
        }
        //email exists?
//password correct?
 //If correct  → server creates a token

//the token proves you are logged in,
//  so the API knows you are authorized
// to use admin actions.
        $token = $user->createToken('admin-token')->plainTextToken;
//laravel checks
//Does this token exist in personal_access_tokens?
//Which user owns it?
        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }
}

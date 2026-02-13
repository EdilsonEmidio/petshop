<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
  public function cadastrarUser(Request $request)
  {
    $data = $request->validate([
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required'
    ]);

    $user = User::create($data);

    return response()->json($user, 201);
  }
  //
  //só pra separar as funções
  //
  public function logarUser(Request $request)
  {
    $data = $request->validate([
      'email' => 'required|email',
      'password' => 'required'
    ]);

    $user = User::where('email', $data['email'])->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
        return response(['message' => 'Credenciais inválidas'], 401);
    }

    $token = $user->createToken("token")->plainTextToken;

    return ['user_id' => $user->id,'token' => $token, 'status' => 201];
  }
  //
  //separando
  //
  public function logoutUser(Request $request)
  {
    
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logout realizado com sucesso']);
  }
}



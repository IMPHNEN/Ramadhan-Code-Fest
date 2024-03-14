<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Veelasky\LaravelHashId\Eloquent\HashableId;

class AuthController extends Controller
{
    public function register(): Response
    {
        return response()->view('login.register');
    }

    public function registerPost(Request $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->redirectToRoute('loginForm')->with(
            'success',
            'Register Successfuly'
        );
    }

    public function login(): Response
    {
        return response()->view('login.loginPage');
    }

    public function loginPost(Request $request): RedirectResponse
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = auth()->user();
            return response()->redirectToRoute('dashboard')->with(
                'success',
                "Bemvindo $user->name"
            );
        }

        return response()->redirectToRoute('loginForm')->with('error', 'Email or Password wrong');
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();
        session()->invalidate();
        session()->regenerate();
        return response()->redirectToRoute('loginForm');
    }
}

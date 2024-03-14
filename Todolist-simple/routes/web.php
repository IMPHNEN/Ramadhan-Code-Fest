<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route Dashboard
Route::group(['middleware' => 'auth'], function () {

    Route::view('/', 'Home.todolist', ['boolean' => false])->name('dashboard');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/profile', function () {
        $id = auth()->user()->user_id;
        $user = User::find($id);
        return view('Home.user-profile', ['user' => $user]);
    })->name('profile');
});

//Route Initial
Route::group(['middleware' => 'guest'], function () {
    //Route Login
    Route::get('/login', [AuthController::class, 'login'])->name('loginForm');
    Route::post('/login', [AuthController::class, 'loginPost'])->name('login');

    //Route Register
    Route::get('/register', [AuthController::class, 'register'])->name('registerForm');
    Route::post('/register', [AuthController::class, 'registerPost'])->name('register');
});

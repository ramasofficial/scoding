<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TodoController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:api'], 'namespace' => 'Api', 'as' => 'api.'], function () {

    // GET Users list
    Route::get('users', [UserController::class, 'index'])->name('users');
    // GET Users list for selec2
    Route::get('select2_users', [UserController::class, 'select2_list'])->name('select2_users');
    // GET User info
    Route::get('users/{id}', [UserController::class, 'info'])->name('user_info');
    // Users create
    Route::post('users/create', [UserController::class, 'store'])->name('users_create');
    // Users update
    Route::put('users/update/{id}', [UserController::class, 'update'])->name('users_update');
    // Users destroy
    Route::delete('users/destroy/{id}', [UserController::class, 'destroy'])->name('users_destroy');


    // GET ToDos list by user
    Route::get('todos', [TodoController::class, 'index'])->name('todos');
    // GET ToDos list by user
    Route::get('todos/admin', [TodoController::class, 'admin_list'])->name('todos_admin');
    // ToDo create
    Route::post('todos/create', [TodoController::class, 'store'])->name('todos_create');
    // ToDo status change
    Route::put('todos/status/{id}', [TodoController::class, 'change_status'])->name('todos_status');

    // Logout
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // GET User info
    Route::get('get_user', [UserController::class, 'get_user'])->name('get_user');
});

// Login
Route::post('/login', [AuthController::class, 'login']);

// Register
Route::post('/register', [AuthController::class, 'register']);

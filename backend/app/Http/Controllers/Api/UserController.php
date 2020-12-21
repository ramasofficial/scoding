<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\RegisterUserRequest;

class UserController extends Controller
{
    /**
     * Return users list
     *
     * @return mixed - response
     */
    public function index(Request $request)
    {
        $size = (int) $request->size;
        $name = $request->name;
        $direction = $request->direction;

        $users = User::limit($size)->orderBy($name, $direction)->paginate($size);
        return response()->json($users, 200);
    }

    /**
     * Return users list for select2
     *
     * @return mixed - response
     */
    public function select2_list()
    {
        $users = User::select('id', 'name as text')->orderBy('name', 'asc')->get();
        return response()->json($users, 200);
    }

    /**
     * Get info by user id
     *
     * @param  int $id - user id
     * @return mixed - response
     */
    public function info($id)
    {
        $user = User::find($id);

        if($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'Invalid Request.'], 400);
        }
    }

    /**
     * Store user method
     *
     * @param  object $request
     * @return mixed - response
     */
    public function store(RegisterUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        return User::create($validated);
    }

    /**
     * Update user method
     *
     * @param  object $request
     * @param  integer $id - User ID
     * @return mixed - response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $validated = $request->validated();
        $user = User::find($id);

        if(!$user) {
            return response()->json(['message' => 'Invalid Request. Please enter correct ID.'], 400);
        }

        if(!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $update = User::where('id', $id)->update($validated);

        if($update) {
            return response()->json('Updated successfully.', 200);
        }
    }

    /**
     * Destroy users method
     *
     * @param  integer $id - User ID
     * @return mixed - response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json(['message' => 'Invalid Request. Please enter correct ID.'], 400);
        }

        if($user->delete()) {
            return response()->json('Deleted successfully.', 200);
        }
    }

    /**
     * Get current user info
     *
     * @return mixed - response
     */
    public function get_user()
    {
        return response()->json(request()->user());
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\ChangeStatusTodoRequest;

class TodoController extends Controller
{
    /**
     * Sort options
     *
     * @var array
     */
    private $sort_options;

    /**
     * TodoController class instance
     */
    public function __construct()
    {
        $this->sort_options = [
            0 => ['column' => 'id', 'option' => 'desc'],
            1 => ['column' => 'created_at', 'option' => 'desc'],
            2 => ['column' => 'created_at', 'option' => 'asc'],
            3 => ['column' => 'status', 'option' => 'desc'],
            4 => ['column' => 'status', 'option' => 'asc'],
        ];
    }
    /**
     * Display a listing of the ToDo list for current requested user.
     *
     * @param  object $request
     * @return mixed - response
     */
    public function index(Request $request)
    {
        $user_id = (int) $request->id;
        $size = (int) $request->size;
        $sort = (int) $request->sort;

        $todos = Todo::where('assigned_to', $user_id)->orderBy($this->sort_options[$sort]['column'], $this->sort_options[$sort]['option'])->limit($size)->get();
        return response()->json($todos, 200);
    }

    /**
     * Display a listing of the ToDo list for admins
     *
     * @param  object $request
     * @return mixed
     */
    public function admin_list(Request $request)
    {
        $size = (int) $request->size;
        $sort = (int) $request->sort;

        $todos = Todo::select('todo.*', 'users.name as assigned_name')->leftJoin('users', 'users.id', '=', 'todo.assigned_to')->orderBy($this->sort_options[$sort]['column'], $this->sort_options[$sort]['option'])->limit($size)->get();
        return response()->json($todos, 200);
    }

    /**
     * Store a newly created ToDo - admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoRequest $request)
    {
        $validated = $request->validated();
        return Todo::create($validated);
    }

    /**
     * Change ToDo status
     *
     * @return mixed - response
     */
    public function change_status(ChangeStatusTodoRequest $request, $id)
    {
        $validated = $request->validated();
        $user = Todo::find($id);

        if(!$user) {
            return response()->json(['message' => 'Invalid Request. Please enter correct ID.'], 400);
        }

        $update = Todo::where('id', $id)->update($validated);

        if($update) {
            return response()->json('Updated successfully.', 200);
        }
    }
}

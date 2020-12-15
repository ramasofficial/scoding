<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $table_name = 'todo';

        Schema::create($table_name, function (Blueprint $table) {
            $table->id()->comment('Unique ID.');
            $table->text('task')->comment('Task.');
            $table->integer('assigned_to')->unsigned()->default(0)->comment('Assigned to User ID.');
            $table->tinyInteger('status')->unsigned()->default(0)->comment('Todo status: 0 - to do; 1 - in progress; 2 - done;');
            $table->timestamps();
            $table->index(['assigned_to']);
        });

        DB::statement("ALTER TABLE `$table_name` comment 'Todos list table.'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todo');
    }
}

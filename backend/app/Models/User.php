<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime:Y-m-d H:i'
    ];

    /**
     * scopeSearch - Search users in api by columns
     *
     * @param  object $query
     * @param  string $search
     */
    public function scopeSearch($query, $search_value)
    {
        if(!empty($search_value) && $search_value != "null") {
            $query->where(function($query) use ($search_value) {
                $i = 1;
                $columns_search = ['name', 'email', 'created_at'];

                foreach($columns_search as $search) {
                    if($i == 1) {
                        $query->where($search,'LIKE','%'.$search_value.'%');
                    } else {
                        $query->orWhere($search,'LIKE','%'.$search_value.'%');
                    }
                    $i++;
                }
            });
        }
    }
}

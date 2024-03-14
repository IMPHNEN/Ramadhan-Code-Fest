<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Veelasky\LaravelHashId\Eloquent\HashableId;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HashableId;

    // add this property to your model if you want to persist to the database.
    protected $shouldHashPersist = true;
    protected $hashColumnName = 'user_id';


    protected $table = 'users';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function todo(): HasMany
    {
        return $this->hasMany(Todo::class, 'user_id', 'user_id');
    }
}

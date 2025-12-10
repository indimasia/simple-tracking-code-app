<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Script extends Model
{
    protected $table = 'scripts';
    protected $fillable = [
        'name',
        'script',
        'is_success',
    ];

    protected $casts = [
        'is_success' => 'boolean',
    ];
}

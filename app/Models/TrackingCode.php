<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackingCode extends Model
{
    protected $table = 'tracking_codes';
    protected $fillable = [
        'user_id',
        'name',
        'script',
        'is_success',
    ];

    protected $casts = [
        'is_success' => 'boolean',
    ];
}

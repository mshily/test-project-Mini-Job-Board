<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = ['title', 'description', 'contact_email', 'location', 'is_remote', 'tags'];

    protected $casts = [
        'is_remote' => 'boolean',
        'tags' => 'array',
    ];
}

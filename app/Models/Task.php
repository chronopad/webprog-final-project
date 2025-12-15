<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    //
    use HasFactory;
    
    protected $fillable = [
        "name",
        "description",
        "type",
        "reward_yield"
    ];

    public function userTasks() {
        return $this->hasMany(UserTask::class);
    }
}

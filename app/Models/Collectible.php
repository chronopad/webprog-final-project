<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collectible extends Model
{
    //
    use HasFactory;
    
    protected $fillable = [
        "name",
        "rarity",
        "image_path"
    ];

    public function userCollectibles() {
        return $this->hasMany(UserCollectible::class);
    }
}

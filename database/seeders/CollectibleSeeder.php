<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Collectible;

class CollectibleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Collectible::factory()->create([
            "name" => "Rain Drop",
            "rarity" => "Common",
            "image_path" => "collectibles/rain-frog.png"
        ]);

        Collectible::factory()->create([
            "name" => "Water Leaf",
            "rarity" => "Common",
            "image_path" => "collectibles/rain-frog.png"
        ]);

        Collectible::factory()->create([
            "name" => "Crystal Wave",
            "rarity" => "Rare",
            "image_path" => "collectibles/rain-frog.png"
        ]);

        Collectible::factory()->create([
            "name" => "Aqua Fairy",
            "rarity" => "Rare",
            "image_path" => "collectibles/rain-frog.png"
        ]);

        Collectible::factory()->create([
            "name" => "River Guardian",
            "rarity" => "Epic",
            "image_path" => "collectibles/rain-frog.png"
        ]);

        Collectible::factory()->create([
            "name" => "Hydra Relic",
            "rarity" => "Epic",
            "image_path" => "collectibles/rain-frog.png"
        ]);
    }
}

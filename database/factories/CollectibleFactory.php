<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collectible>
 */
class CollectibleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rarities = ["Common", "Rare", "Epic"];
        return [
            'name' => $this->faker->sentence(2),
            'rarity' => $this->faker->randomElement($rarities),
            'image_path' => 'collectibles/rain-frog.png'
        ];
    }
}

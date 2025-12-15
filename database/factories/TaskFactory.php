<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        $type = $this->faker->randomElement(['daily', 'weekly']);

        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(10),
            'type' => $type,
            'reward_yield' => $type === 'daily'
                ? $this->faker->numberBetween(5, 30)
                : $this->faker->numberBetween(30, 150),
        ];
    }
}

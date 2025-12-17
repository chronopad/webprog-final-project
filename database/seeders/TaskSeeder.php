<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Task::factory()->create([
            'name' => "Shorter Shower",
            'description' => "Take a shower for 10 minutes or less today.",
            'type' => "daily",
            'reward_yield' => 20
        ]);

        Task::factory()->create([
            'name' => "Drink from Reusable Water Bottle",
            'description' => "Use a reusable water bottle instead of buying bottled water.",
            'type' => "daily",
            'reward_yield' => 15
        ]);

        Task::factory()->create([
            'name' => "Turn Off Tap",
            'description' => "Turn off the tap while brushing your teeth.",
            'type' => "daily",
            'reward_yield' => 8
        ]);

        Task::factory()->create([
            'name' => "Daily Task XXX",
            'description' => "lorem ipsum save water energy",
            'type' => "daily",
            'reward_yield' => 10
        ]);

        Task::factory()->create([
            'name' => "Educate Others",
            'description' => "Share water-saving tips with friends or family.",
            'type' => "weekly",
            'reward_yield' => 100
        ]);

        Task::factory()->create([
            'name' => "Efficient Washing",
            'description' => "Run the washing machine and dishwasher only with full loads.",
            'type' => "weekly",
            'reward_yield' => 120
        ]);

        Task::factory()->create([
            'name' => "Weekly Task Example XXX",
            'description' => "lorem ipsum water clean",
            'type' => "weekly",
            'reward_yield' => 110
        ]);

        Task::factory()->create([
            'name' => "Weekly Task Example YYY",
            'description' => "lorem ipsum dolor sit amet",
            'type' => "weekly",
            'reward_yield' => 150
        ]);


        // Task::factory()->count(10)->create()
    }
}

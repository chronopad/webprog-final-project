<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\UserTask;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function data(Request $request) {
        $user = $request->user();

        // Pick 3 daily + 3 weekly challenges

        $today = now()->toDateString();
        $dailyKey = "user:{$user->id}:daily:{$today}";

        // Pick 3 daily tasks once per day (per user), and reuse the same 3 until the cache expires.
        $dailyIds = Cache::remember($dailyKey, now()->endOfDay(), function () {
            return Task::where('type', 'daily')->inRandomOrder()->limit(3)->pluck('id')->toArray();
        });

        $week = now()->isoWeek();
        $year = now()->year;
        $weeklyKey = "user:{$user->id}:weekly:{$year}-W{$week}";

        $weeklyIds = Cache::remember($weeklyKey, now()->endofWeek(), function () {
            return Task::where('type', 'weekly')->inRandomOrder()->limit(3)->pluck('id')->toArray();
        });

        $selectedIds = array_values(array_unique(array_merge($dailyIds, $weeklyIds)));

        $selectedTasks = Task::whereIn('id', $selectedIds)->get()->keyBy('id');

        foreach ($selectedTasks as $task) {
            UserTask::firstOrCreate(
                ['user_id' => $user->id, 'task_id' => $task->id],
                ['completion_status' => false, 'completion_count' => 0, 'last_completed_at' => null]
            );
        }

        // Reset completion status

        $now = Carbon::now();

        $userTasks = UserTask::with('task')->where('user_id', $user->id)->whereIn('task_id', $selectedIds)->get();

        foreach ($userTasks as $ut) {
            if (!$ut->last_completed_at)
                continue;

            $last = Carbon::parse($ut->last_completed_at);

            // Daily reset
            if ($ut->task->type === 'daily' && !$last->isSameDay($now)) {
                $ut->completion_status = false;
                $ut->save();
            }

            // Weekly reset
            if ($ut->task->type === 'weekly') {
                if ($last->isoWeek() !== $now->isoWeek() || $last->year !== $now->year) {
                    $ut->completion_status = false;
                    $ut->save();
                }
            }
        }

        // Return response
        $payload = $userTasks->map(function ($ut) {
            return [
                'id' => $ut->task->id,
                'title' => $ut->task->name,
                'coinYield' => $ut->task->reward_yield,
                'description' => $ut->task->description,
                'type' => $ut->task->type,
                'checked' => (bool) $ut->completion_status,
            ];
        })->values();

        return response()->json([
            'currency' => (int) $user->currency,
            'tasks' => $payload,
        ]);
    }

    public function complete(Request $request, Task $task) {
        $user = $request->user();
        // $checked = (bool) $request->boolean('checked'); // Frontend sends true/false

        // Recompute the active task IDs for this user
        $today = now()->toDateString();
        $dailyKey = "user:{$user->id}:daily:{$today}";
        $dailyIds = Cache::remember($dailyKey, now()->endOfDay(), function () {
            return Task::where('type', 'daily')->inRandomOrder()->limit(3)->pluck('id')->toArray();
        });

        $week = now()->isoWeek();
        $year = now()->year;
        $weeklyKey = "user:{$user->id}:weekly:{$year}-W{$week}";
        $weeklyIds = Cache::remember($weeklyKey, now()->endOfWeek(), function () {
            return Task::where('type', 'weekly')->inRandomOrder()->limit(3)->pluck('id')->toArray();
        });

        $activeIds = array_values(array_unique(array_merge($dailyIds, $weeklyIds)));

        // Block completing tasks that are not active
        if (!in_array($task->id, $activeIds, true)) {
            return response()->json([
                'ok' => false,
                'error' => 'TASK_NOT_ACTIVE',
            ], 403);
        }

        return DB::transaction(function () use ($user, $task, $checked) {

            $userTask = UserTask::firstOrCreate(
                ['user_id' => $user->id, 'task_id' => $task->id],
                ['completion_status' => false, 'completion_count' => 0, 'last_completed_at' => null]
            );

            // If user tries to UNCHECK, ignore it ("locked" behavior)
            // if ($checked === false) {
            //     return response()->json([
            //         'ok' => true,
            //         'currency' => (int) $user->currency,
            //         'checked' => (bool) $userTask->completion_status,
            //         'locked' => (bool) $userTask->completion_status,
            //     ]);
            // }

            // If already completed for this day/week, do nothing (prevents double coins)
            if ($userTask->completion_status) {
                return response()->json([
                    'ok' => true,
                    'currency' => (int) $user->currency,
                    'checked' => true,
                ]);
            }

            $userTask->completion_status = true;
            $userTask->completion_count += 1;
            $userTask->last_completed_at = now();
            $userTask->save();

            $user->currency += (int) $task->reward_yield;
            $user->save();

            return response()->json([
                'ok' => true,
                'currency' => (int) $user->currency,
                'checked' => true,
            ]);
        });
    }
}

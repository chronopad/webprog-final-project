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
    private function testUser(): User
    {
        return User::where('email', 'test@example.com')->firstOrFail();
    }

    public function index() {
        $user = $this->testUser();

        // Pick 3 daily + 3 weekly challenges

        $today = now()->toDateString();

        $dailyKey = "user:{$user->id}:daily:{$today}";

        $dailyIds = Cache::remember($dailyKey, now()->addDay(), function () {
            return Task::where('type', 'daily')->inRandomOrder()->limit(3)->pluck('id')->toArray();
        });

        $week = now()->isoWeek();
        $year = now()->year;
        $weeklyKey = "user:{$user->id}:weekly:{$year}-W{$week}";

        $weeklyIds = Cache::remember($weeklyKey, now()->addDays(7), function () {
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

    public function toggle(Request $request, Task $task) {
        $user = $this->testUser();
        $checked = (bool) $request->boolean('checked'); // Frontend sends true/false

        return DB::transaction(function () use ($user, $task, $checked) {

            $userTask = UserTask::firstOrCreate(
                ['user_id' => $user->id, 'task_id' => $task->id],
                ['completion_status' => false, 'completion_count' => 0, 'last_completed_at' => null]
            );

            // If user tries to UNCHECK, ignore it (this is your "locked" behavior)
            if ($checked === false) {
                return response()->json([
                    'ok' => true,
                    'currency' => (int) $user->currency,
                    'checked' => (bool) $userTask->completion_status,
                    'locked' => (bool) $userTask->completion_status,
                ]);
            }

            // If already completed for this day/week, do nothing (prevents double coins)
            if ($userTask->completion_status === true) {
                return response()->json([
                    'ok' => true,
                    'currency' => (int) $user->currency,
                    'checked' => true,
                    'locked' => true,
                ]);
            }

            // Otherwise: first time completing -> mark complete + give coins
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
                'locked' => true,
            ]);
        });
    }
}

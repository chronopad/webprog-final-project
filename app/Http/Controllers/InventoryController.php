<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Collectible;

use Illuminate\Http\Request;

class InventoryController extends Controller
{
    //
    public function data(Request $request) {
        $user = $request->user();

        $ownedIds = $user->userCollectibles()->pluck('collectible_id')->toArray();

        // Get all collectibles (so we can show ??? for the unowned ones)
        $collectibles = Collectible::all();

        $payload = $collectibles->map(function ($c) use ($ownedIds) {
            $owned = in_array($c->id, $ownedIds);
            return [
                'id' => $c->id,
                'name' => $owned ? $c->name : '???',
                'rarity' => $c->rarity,
                'image' => $owned ? asset('storage/' . $c->image_path) : asset('storage/collectibles/placeholder.png'),
                'owned' => $owned,
            ];
        })->values();

        return response()->json([
            'collectibles' => $payload,
            'ownedCount' => count($ownedIds),
            'totalCount' => $collectibles->count(),
        ]);
    }

    public function unlock(Request $request) {
        $user = $request->user();
        $cost = 200;

        return DB::transaction(function () use ($user, $cost) {

            // Lock the user row to prevent double-spend if they spam click
            $user = $user->lockForUpdate()->find($user->id);

            if ($user->currency < $cost) {
                return response()->json([
                    'ok' => false,
                    'error' => 'NOT_ENOUGH_CURRENCY',
                    'currency' => (int) $user->currency,
                ], 422);
            }

             // Get IDs the user already owns
            $ownedIds = UserCollectible::where('user_id', $user->id)->pluck('collectible_id');

            // Pick a random unowned collectible
            $collectible = Collectible::whereNotIn('id', $ownedIds)->inRandomOrder()->first();

            // If none left, user owns everything
            if (!$collectible) {
                return response()->json([
                    'ok' => false,
                    'error' => 'ALL_COLLECTIBLES_OWNED',
                    'currency' => (int) $user->currency,
                ], 409);
            }

            $user->currency -= $cost;
            $user->save();

            // Save ownership
            UserCollectible::create([
                'user_id' => $user->id,
                'collectible_id' => $collectible->id,
                'collected_at' => now(),
            ]);

            return response()->json([
                'ok' => true,
                'currency' => (int) $user->currency,
                'collectible' => [
                    'id' => $collectible->id,
                    'name' => $collectible->name,
                    'rarity' => $collectible->rarity,
                    'image' => $collectible->image,
                ],
            ]);
        });
    }
}

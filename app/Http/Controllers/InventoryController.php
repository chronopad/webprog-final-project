<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Collectible;

use Illuminate\Http\Request;

class InventoryController extends Controller
{
    //
    private function testUser(): User
    {
        return User::where('email', 'test@example.com')->firstOrFail();
    }

    public function index() {
        $user = $this->testUser();

        $ownedIds = $user->userCollectibles()->pluck('collectible_id')->toArray();

        // Get all collectibles (so we can show ??? for the unowned ones)
        $collectibles = Collectible::all();

        $payload = $collectibles->map(function ($c) use ($ownedIds) {
            $owned = in_array($c->id, $ownedIds);
            return [
                'id' => $c->id,
                'name' => $owned ? $c->name : '???',
                'rarity' => $c->rarity,
                'image' => $owned ? $c->image : 'placeholder.png',
                'owned' => $owned,
            ];
        })->values();

        return response()->json([
            'collectibles' => $payload,
            'ownedCount' => count($ownedIds),
            'totalCount' => $collectibles->count(),
        ]);
    }
}

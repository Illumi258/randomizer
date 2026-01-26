<?php

namespace App\Services\ItemsServices;

use App\Models\Items;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class saveItemsServices {

    public function addItem(array $items){
        $user = Auth::user();
        
        $data = [
            'user_id' => $user->id,
            'item' => $items['item'],
            'remaining' => $items['remaining'],
            'status' => 'active', // Add default status
        ];

        // Handle image upload
        if (isset($items['image']) && $items['image']) {
            $imagePath = $items['image']->store('items', 'public');
            $data['image'] = $imagePath;
        }

        $savingItems = Items::create($data);

        return [
            'success' => true,
            'message' => 'Item saved successfully',
            'data' => $savingItems,
        ];
    }
}
<?php

namespace App\Services\ItemsServices;
use App\Models\Items;

class UpdateRemainingItemsServices {
    
    public function updateRemaining(int $id)
    {
        $item = Items::find($id);

        if (!$item) {
            return [
                'success' => false,
                'message' => 'Item not found'
            ];
        }

        // Decrease remaining by 1, but don't go below 0
        $newRemaining = max(0, $item->remaining - 1);
        
        $item->update(['remaining' => $newRemaining]);

        return [
            'success' => true,
            'message' => 'Item remaining updated successfully',
            'data' => $item
        ];
    }
}
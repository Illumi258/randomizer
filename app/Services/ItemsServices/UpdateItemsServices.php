<?php

namespace App\Services\ItemsServices;
use App\Models\Items;
use Illuminate\Support\Facades\Storage;

class UpdateItemsServices {
    
    public function updateItem(int $id, array $data)
    {
        $item = Items::find($id);

        if (!$item) {
            return [
                'success' => false,
                'message' => 'Item not found'
            ];
        }

        $updateData = [
            'item' => $data['item'],
            'remaining' => $data['remaining']
        ];

        // Handle image upload if present
        if (isset($data['image']) && $data['image']) {
            // Delete old image if exists
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }

            // Store new image
            $imagePath = $data['image']->store('items', 'public');
            $updateData['image'] = $imagePath;
        }

        $item->update($updateData);

        return [
            'success' => true,
            'message' => 'Item updated successfully',
            'data' => $item
        ];
    }
}
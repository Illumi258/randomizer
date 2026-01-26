<?php

namespace App\Services\ItemsServices;

use App\Models\Items;

class SoftDeleteServices {

    public function updateStatus(int $id){

        $item = Items::find($id);

        if (!$item) {
            return [
                'success' => false,
                'message' => 'Item not found'
            ];
        }
        
       $item->update([
            'status' => 'Inactive'
        ]);

          return [
            'success' => true,
            'message' => 'Item deleted successfully',
            'data' => $item
        ];
    }
}
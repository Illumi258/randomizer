<?php

namespace App\Services\ItemsServices; 

use App\Models\Items;

class FetchItemsServices {

    public function fetchItems (){

        $item = Items::where('status', 'active')
            ->select(
                'id',
                'item',
                'remaining',
                'reedem',
                'status',
                'image',
                'icon'
            )
           ->get();

           return [
                'success' => true,
                'data' => $item
           ];
    }

}
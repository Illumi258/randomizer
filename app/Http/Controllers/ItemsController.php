<?php

namespace App\Http\Controllers;

use App\Http\Requests\Validations\Item\StoreItemValidation;
use App\Http\Requests\Validations\Item\UpdateRemainingItemRequest;

// services 
use App\Services\ItemsServices\saveItemsServices;
use App\Services\ItemsServices\FetchItemsServices;
use App\Services\ItemsServices\SoftDeleteServices;
use App\Services\ItemsServices\UpdateItemsServices;
use App\Services\ItemsServices\UpdateRemainingItemsServices;

class ItemsController extends Controller {

    public function addItems(StoreItemValidation $request, saveItemsServices $services) {
        $result = $services->addItem($request->validated());
        return response()->json($result);
    }


    public function showItem(FetchItemsServices $services){
        $result = $services->fetchItems();
        return response()->json($result);
    }

    public function deleteItem( $id, SoftDeleteServices $services){
        $result = $services->updateStatus($id);
        return response()->json($result);
    }

    public function updateItems( $id, StoreItemValidation $request, UpdateItemsServices $services) {
        $result = $services->updateItem($id, $request->validated());
        return response()->json($result);
    }

    public function updateRemainingItems(UpdateRemainingItemRequest $request, UpdateRemainingItemsServices $services) {
        $result = $services->updateRemaining($request->validated()['id']);
        return response()->json($result);
    }

}
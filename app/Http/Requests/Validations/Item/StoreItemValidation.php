<?php 

namespace App\Http\Requests\Validations\Item;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemValidation extends FormRequest {
    
    public function rules():array {
        return [
             'item' =>  'required|max:50',
             'remaining' =>  'required|numeric|between:0,9999999999.99',
             'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages(): array {
        return [
             'item.required' => 'Item name is required.',
             'item.max' => 'Item cannot exceed 50 characters.',
             'remaining.required' => 'Remaining amount is required.',
             'remaining.numeric' => 'Remaining amount must be a valid number.',
             'remaining.between' => 'Remaining amount must be between 0 and 9,999,999,999.99.',
             'image.image' => 'File must be an image.',
             'image.mimes' => 'Image must be jpeg, png, jpg, or gif.',
             'image.max' => 'Image cannot exceed 2MB.',
        ];
    }
}
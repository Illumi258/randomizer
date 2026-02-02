<?php

namespace App\Http\Requests\Validations\Item;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRemainingItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|exists:item_prize,id'
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Item ID is required',
            'id.exists' => 'Item not found'
        ];
    }
}
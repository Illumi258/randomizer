<?php

namespace App\Http\Requests\Validations\Participants;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRedeemedItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|exists:participants,id',
            'redeemed_item' => 'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'fullname.required' => 'participants is not existing',
        ];
    }
}
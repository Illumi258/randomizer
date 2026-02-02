<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParticipantsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fullname' => 'required|string|max:100',
            'position' => 'required|string|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'fullname.required' => 'Full name is required',
            'fullname.max' => 'Full name cannot exceed 100 characters',
            'position.required' => 'Position is required',
            'position.max' => 'Position cannot exceed 50 characters',
        ];
    }
}
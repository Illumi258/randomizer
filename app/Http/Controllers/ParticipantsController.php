<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ParticipantsServices\SaveParticipantsServices;
use App\Http\Requests\ParticipantsRequest;

class ParticipantsController extends Controller
{
    protected $saveParticipantsServices;

    public function __construct(SaveParticipantsServices $saveParticipantsServices)
    {
        $this->saveParticipantsServices = $saveParticipantsServices;
    }

    public function store(ParticipantsRequest $request)
    {
        try {
            $result = $this->saveParticipantsServices->addParticipant($request->validated());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save participant: ' . $e->getMessage(),
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ParticipantsServices\SaveParticipantsServices;
use App\Services\ParticipantsServices\FetchParticipantsServices;
use App\Services\ParticipantsServices\SoftDeleteParticipantsServices;
use App\Services\ParticipantsServices\UpdateParticipantsServices;
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

    public function showParticipants(FetchParticipantsServices $services)
    {
        $result = $services->fetchParticipants();
        return response()->json($result);
    }

    public function deleteParticipant($id, SoftDeleteParticipantsServices $services)
    {
        $result = $services->updateStatus($id);
        return response()->json($result);
    }

    public function updateParticipants($id, ParticipantsRequest $request, UpdateParticipantsServices $services)
    {
        $result = $services->updateParticipant($id, $request->validated());
        return response()->json($result);
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Participants\ParticipantsRequest;
use App\Http\Requests\Validations\Participants\UpdateRedeemedItemRequest;

use App\Services\ParticipantsServices\SaveParticipantsServices;
use App\Services\ParticipantsServices\FetchParticipantsServices;
use App\Services\ParticipantsServices\SoftDeleteParticipantsServices;
use App\Services\ParticipantsServices\UpdateParticipantsServices;
use App\Services\ParticipantsServices\ExportParticipantsServices;
use App\Services\ParticipantsServices\ImportParticipantsServices;
use App\Services\ParticipantsServices\SaveWinnerParticipants;


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

    public function showParticipants(FetchParticipantsServices $services){
        $result = $services->fetchParticipants();
        return response()->json($result);
    }

    public function showWInners(FetchParticipantsServices $services){
    $result = $services->fetchWinners();
    return response()->json($result);
    }

    public function showParticipantsWithoutItem(FetchParticipantsServices $services){
        $result = $services->fetchParticipantNotCurrentlyWinner();
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

    public function exportParticipants(ExportParticipantsServices $services)
    {
        $result = $services->exportParticipants();
        
        if ($result['success']) {
            return response($result['data'])
                ->header('Content-Type', 'text/csv')
                ->header('Content-Disposition', 'attachment; filename="' . $result['filename'] . '"');
        }
        
        return response()->json($result, 500);
    }

    public function importParticipants(Request $request, ImportParticipantsServices $services){
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048'
        ]);

        $result = $services->importParticipants($request->file('file'));
        return response()->json($result);
    }

    public function updateRedeemedItems(UpdateRedeemedItemRequest $request, SaveWinnerParticipants $services){
        $result = $services->updateReedemedItem($request->validated());
        return response()->json($result);
    }
}
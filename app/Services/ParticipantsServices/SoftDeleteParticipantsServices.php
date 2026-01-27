<?php

namespace App\Services\ParticipantsServices;

use App\Models\Participants;

class SoftDeleteParticipantsServices {

    public function updateStatus(int $id){

        $participant = Participants::find($id);

        if (!$participant) {
            return [
                'success' => false,
                'message' => 'Participant not found'
            ];
        }
        
        $participant->update([
            'status' => 'inactive'
        ]);

          return [
            'success' => true,
            'message' => 'Participant deleted successfully',
            'data' => $participant
        ];
    }
}
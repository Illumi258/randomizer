<?php

namespace App\Services\ParticipantsServices;
use App\Models\Participants;

class UpdateParticipantsServices {
    
    public function updateParticipant(int $id, array $data)
    {
        $participant = Participants::find($id);

        if (!$participant) {
            return [
                'success' => false,
                'message' => 'Participant not found'
            ];
        }

        $updateData = [
            'fullname' => $data['fullname'],
            'position' => $data['position']
        ];

        $participant->update($updateData);

        return [
            'success' => true,
            'message' => 'Participant updated successfully',
            'data' => $participant
        ];
    }
}
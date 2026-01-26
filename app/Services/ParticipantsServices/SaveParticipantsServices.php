<?php

namespace App\Services\ParticipantsServices;

use App\Models\Participants;

class SaveParticipantsServices {
    
    public function addParticipant(array $participants){
        $data = [
            'fullname' => $participants['fullname'],
            'position' => $participants['position'],
        ];

        $savingParticipants = Participants::create($data);

        return [
            'success' => true,
            'message' => 'Participant saved successfully',
            'data' => $savingParticipants,
        ];
    }
}
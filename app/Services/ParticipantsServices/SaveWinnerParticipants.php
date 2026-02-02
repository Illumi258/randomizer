<?php

namespace App\Services\ParticipantsServices;

use App\Models\Participants;

class SaveWinnerParticipants {
    
    public function updateReedemedItem(array $participants){

         $participant = Participants::find($participants['id']);

          if (!$participant) {
            return [
                'success' => false,
                'message' => 'Participant not found',
            ];
        }

        $participant->redeemed_item = $participants['redeemed_item'];
        $participant->save();

        return [
            'success' => true,
            'message' => 'Participant saved successfully',
            'data' => $participant,
        ];
    }
}
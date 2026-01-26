<?php

namespace App\Services\ParticipantsServices; 

use App\Models\Participants;

class FetchParticipantsServices {

    public function fetchParticipants(){

        $participants = Participants::select(
                'id',
                'fullname',
                'position',
                'redeemed_item',
                'status'
            )
           ->get();

           return [
                'success' => true,
                'data' => $participants
           ];
    }
}
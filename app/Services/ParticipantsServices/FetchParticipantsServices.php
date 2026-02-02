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
           ->where('status', 'active')
           ->get();

           return [
                'success' => true,
                'data' => $participants
           ];
    }


    public function fetchParticipantNotCurrentlyWinner(){

         $participants = Participants::select(
                'id',
                'fullname',
                'position',
                'redeemed_item',
                'status'
            )
           ->where('status', 'active')
           ->whereNull('redeemed_item')
           ->get();
           
           return [
                'success' => true,
                'data' => $participants
           ];
        
    }
}
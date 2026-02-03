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
            ->where(fn ($q) =>
            $q->whereNull('redeemed_item')
              ->orWhere('redeemed_item', '')
        )
           ->get();

           return [
                'success' => true,
                'data' => $participants
           ];
        
    }

    public function fetchWinners(){

    $participants = Participants::select(
        'id',
        'fullname',
        'position',
        'redeemed_item',
        'status'
    )
        ->where('status', 'active')
        ->whereNotNull('redeemed_item')
        ->where('redeemed_item', '!=', '')
        ->get();

    return [
        'success' => true,
        'data' => $participants
    ];
}

}
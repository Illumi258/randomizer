<?php

namespace App\Services\ParticipantsServices;

use App\Models\Participants;

class ExportParticipantsServices
{
    public function exportParticipants()
    {
        $participants = Participants::select('fullname', 'position', 'redeemed_item')->get();
        
        $csvData = "Full Name,Position,Redeemed Item\n";
        
        foreach ($participants as $participant) {
            $csvData .= '"' . str_replace('"', '""', $participant->fullname) . '",';
            $csvData .= '"' . str_replace('"', '""', $participant->position) . '",';
            $csvData .= '"' . str_replace('"', '""', $participant->redeemed_item ?? '') . '"' . "\n";
        }
        
        return [
            'success' => true,
            'data' => $csvData,
            'filename' => 'participants_' . date('Y-m-d_H-i-s') . '.csv'
        ];
    }
}
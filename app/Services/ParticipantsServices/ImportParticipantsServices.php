<?php

namespace App\Services\ParticipantsServices;

use App\Models\Participants;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class ImportParticipantsServices
{
    public function importParticipants(UploadedFile $file)
    {
        if ($file->getClientOriginalExtension() !== 'csv') {
            return [
                'success' => false,
                'message' => 'File must be a CSV file'
            ];
        }
        
        $csvData = file_get_contents($file->getRealPath());
        $lines = explode("\n", $csvData);
        
        // Remove header line
        array_shift($lines);
        
        $imported = 0;
        $errors = [];
        
        foreach ($lines as $index => $line) {
            $line = trim($line);
            if (empty($line)) continue;
            
            $data = str_getcsv($line);
            
            if (count($data) < 2) {
                $errors[] = "Line " . ($index + 2) . ": Invalid format - must have Full Name and Position";
                continue;
            }
            
            $validator = Validator::make([
                'fullname' => $data[0] ?? '',
                'position' => $data[1] ?? '',
            ], [
                'fullname' => 'required|string|max:100',
                'position' => 'required|string|max:50',
            ]);
            
            if ($validator->fails()) {
                $errors[] = "Line " . ($index + 2) . ": " . implode(', ', $validator->errors()->all());
                continue;
            }
            
            try {
                Participants::create([
                    'fullname' => trim($data[0]),
                    'position' => trim($data[1]),
                ]);
                $imported++;
            } catch (\Exception $e) {
                $errors[] = "Line " . ($index + 2) . ": Failed to save - " . $e->getMessage();
            }
        }
        
        return [
            'success' => true,
            'message' => "Successfully imported {$imported} participants",
            'imported' => $imported,
            'errors' => $errors
        ];
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Participants extends Model {

     protected $table = 'participants';

     protected $fillable = [
        'fullname',
        'position',
        'redeemed_item',
        'status',
     ];
}
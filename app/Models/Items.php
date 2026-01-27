<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Items extends Model {

     protected $table = 'item_prize';

     protected $fillable = [
        'user_id',
        'item',
        'remaining',
        'reedem',
        'status',
        'image',
        'icon',
     ];

}
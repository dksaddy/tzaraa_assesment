<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    //
     protected $table = 'designation';

     function department()
     {
         return $this->belongsTo(Department::class, 'department_id');
     }
}

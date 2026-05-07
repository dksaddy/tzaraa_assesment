<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{
    //
    protected $table = 'employee'; 

    public function designation()
    {
        // 'designation_id' is the foreign key in your employees table
        return $this->belongsTo(Designation::class, 'designation_id');
    }
    
}

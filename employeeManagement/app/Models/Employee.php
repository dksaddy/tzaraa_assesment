<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{
    //
    protected $table = 'employee';

    public function designation()
    {
        return $this->belongsTo(Designation::class, 'designation_id');
    }
     public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

     protected $fillable = [
        'name',
        'email',
        'phone',
        'designation_id',
        'status'
    ];
    
}

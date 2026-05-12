<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Employee</title>
    <link rel="stylesheet" href="{{ asset('CSS/add_and_edit.css') }}">
</head>

<body>

    @extends('employee.layout.layout')
    @section('content')

        <div class="error-box">
            @if ($errors->any())
                <div style="color: red;">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>


        <form action="{{ route('employee.store') }}" method="POST">
            <h1>Add Employee</h1>
            @csrf

            <input type="text" name="name" placeholder="Name" value="{{ old('name') }}">
            <input type="email" name="email" placeholder="Email" value="{{ old('email') }}">
            <input type="text" name="phone" placeholder="Phone" value="{{ old('phone') }}">

            <!-- Department Dropdown -->
            <select name="department_id" id="department_id">
                <option value="">Select Department</option>
                @foreach($departments as $dept)
                    <option value="{{ $dept->id }}">{{ $dept->name }}</option>
                @endforeach
            </select>

            <!-- Designation Dropdown (Starts empty) -->
            <select name="designation_id" id="designation_id">
                <option value="">Select Designation</option>
            </select>


            <!-- Status Radio Buttons -->
            <div class="status-group">
                <label>
                    <input type="radio" name="status" value="active" checked> Active
                </label>
                <label>
                    <input type="radio" name="status" value="inactive"> Inactive
                </label>
            </div>

            <button type="submit">Add Employee</button>
        </form>

    @endsection

    @push('scripts')
        @include('employee.partials.designation-script')
    @endpush

</body>

</html>
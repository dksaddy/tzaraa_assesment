<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Employee</title>
    <link rel="stylesheet" href="{{ asset('CSS/edit.css') }}">
</head>

<body>

    <div>

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

        <form action="{{ route('employee.update', $emp->id) }}" method="POST">
            <h2 style="text-align: center; margin-bottom: 10px; color: #1e293b;">Edit Employee</h2>
            @csrf
            @method('PUT')

            <input type="text" name="name" value="{{ $emp->name }}">
            <input type="email" name="email" value="{{ $emp->email }}">
            <input type="text" name="phone" value="{{ $emp->phone }}">

            <select name="department_id" id="department_id">
                @foreach($departments as $dept)
                    <option value="{{ $dept->id }}" {{ $emp->department_id == $dept->id ? 'selected' : '' }}>
                        {{ $dept->name }}
                    </option>
                @endforeach
            </select>

            <select name="designation_id" id="designation_id">
                @foreach($designations as $designation)
                    <option value="{{ $designation->id }}" {{ $emp->designation_id == $designation->id ? 'selected' : '' }}>
                        {{ $designation->name }}
                    </option>
                @endforeach
            </select>

            <div class="status-group">
                <label><input type="radio" name="status" value="active" {{ $emp->status == 'active' ? 'checked' : '' }}>
                    Active</label>
                <label><input type="radio" name="status" value="inactive" {{ $emp->status == 'inactive' ? 'checked' : '' }}>
                    Inactive</label>
            </div>

            <button type="submit">Update Employee</button>
        </form>
    </div>

    <script>
        document.getElementById('department_id').addEventListener('change', function () {
            let deptId = this.value;
            let designationSelect = document.getElementById('designation_id');

            designationSelect.innerHTML = '<option value="">Loading...</option>';

            if (deptId) {
                fetch(`/get-designations/${deptId}`)
                    .then(response => response.json())
                    .then(data => {
                        designationSelect.innerHTML = '<option value="">Select Designation</option>';
                        data.forEach(designation => {
                            let option = document.createElement('option');
                            option.value = designation.id;
                            option.text = designation.name;
                            designationSelect.add(option);
                        });
                    })
                    .catch(error => console.error('Error fetching designations:', error));
            } else {
                designationSelect.innerHTML = '<option value="">Select Designation</option>';
            }
        });
    </script>


</body>

</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Employee</title>

    <style>
        /* Reset and Core Layout */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            /* Horizontal Center */
            align-items: center;
            /* Vertical Center */
            min-height: 100vh;
            width: 100%;
            padding: 20px;
        }

        /* This targets the wrapper <div> you added */
        body>div {
            width: 100%;
            max-width: 450px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        form {
            background: #ffffff;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* Inputs, Selects & Buttons */
        input[type="text"],
        input[type="email"],
        select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }

        input:focus,
        select:focus {
            border-color: #2563eb;
            ring: 2px solid #3b82f6;
        }

        /* Status Selection */
        .status-group {
            display: flex;
            gap: 20px;
            background: #f9fafb;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        label {
            font-size: 14px;
            color: #374151;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        input[type="radio"] {
            accent-color: #2563eb;
            width: 17px;
            height: 17px;
        }

        button[type="submit"] {
            background-color: #2563eb;
            color: white;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.2s;
        }

        button[type="submit"]:hover {
            background-color: #1d4ed8;
        }

        /* Modern Error Box */
        .error-box {
            width: 100%;
        }

        .error-box ul {
            background-color: #fef2f2;
            border: 1px solid #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 12px 12px 12px 30px;
            border-radius: 8px;
            list-style: disc;
            color: #b91c1c;
            font-size: 13px;
        }

        /* Hide error box if no errors exist to keep layout clean */
        .error-box:empty {
            display: none;
        }
    </style>

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


        <form action="{{ route('employee.store') }}" method="POST">
            <h1 style="text-align: center; color: #374151;">Add Employee</h1>
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
    </div>

    <script>
        document.getElementById('department_id').addEventListener('change', function () {
            let deptId = this.value;
            let designationSelect = document.getElementById('designation_id');

            designationSelect.innerHTML = '<option value="">Select Designation</option>';

            if (deptId) {
                fetch(`/get-designations/${deptId}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(designation => {
                            let option = document.createElement('option');
                            option.value = designation.id;
                            option.text = designation.name;
                            designationSelect.add(option);
                        });
                    });
            }
        });
    </script>


</body>

</html>
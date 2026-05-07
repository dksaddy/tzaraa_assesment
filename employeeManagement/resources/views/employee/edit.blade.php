<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Employee</title>
    <style>
        /* Reset and Center Layout */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        /* Form Card */
        form {
            background: #ffffff;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 450px;
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        /* Text Inputs and Dropdowns */
        input[type="text"],
        input[type="email"],
        select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus,
        select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        /* Radio Button Group */
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

        /* Update Button */
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
            margin-top: 10px;
        }

        button[type="submit"]:hover {
            background-color: #1d4ed8;
        }
    </style>
</head>

<body>

    <form action="{{ route('employee.update', $emp->id) }}" method="POST">
        <h2 style="text-align: center; margin-bottom: 10px; color: #1e293b;">Edit Employee</h2>
        @csrf
        @method('PUT')

        <input type="text" name="name" value="{{ $emp->name }}">
        <input type="email" name="email" value="{{ $emp->email }}">
        <input type="text" name="phone" value="{{ $emp->phone }}">

        <select name="designation_id">
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

</body>

</html>
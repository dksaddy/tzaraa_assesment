<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            padding: 40px;
            color: #333;
        }
        .container {
            max-width: 1000px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h2 {
            margin-bottom: 20px;
            color: #2c3e50;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th {
            background-color: #f8f9fa;
            color: #777;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-align: left;
            padding: 15px;
            border-bottom: 2px solid #eee;
        }
        td {
            padding: 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
        }
        tr:hover {
            background-color: #f9f9f9;
        }
        /* Status Badge Styling */
        .badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: capitalize;
        }
        .active {
            background-color: #e6fffa;
            color: #38b2ac;
        }
        .inactive {
            background-color: #fff5f5;
            color: #e53e3e;
        }
        .btn-action {
            text-decoration: none;
            color: #3498db;
            font-size: 13px;
            margin-right: 10px;
        }
        .btn-action:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Employee List</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($employee as $emp)
            <tr>
                <td>#{{ $emp->id }}</td>
                <td><strong>{{ $emp->name }}</strong></td>
                <td>{{ $emp->designation->name ?? 'N/A' }}</td>
                <td>{{ $emp->designation->department->name ?? 'N/A' }}</td>
                <td>{{ $emp->email }}</td>
                <td>{{ $emp->phone }}</td>
                <td>
                    <span class="badge {{ $emp->status }}">
                        {{ $emp->status }}
                    </span>
                </td>
                <td>
                    <a href="#" class="btn-action">Edit</a>
                    <a href="#" class="btn-action" style="color:red;">Delete</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

</body>
</html>

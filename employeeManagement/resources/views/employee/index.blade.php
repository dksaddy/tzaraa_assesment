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
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

    .search {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      gap: 10px;
    }
  </style>
</head>

<body>

  <div class="container">
    <h2 style="text-align: center; margin-bottom: 10px; color: #1e293b;">Employee List</h2>

    <form action="/search" method="get" class="search"
      style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">

      <!-- Text Search -->
      <input type="text" name="search" value="{{ request('search') }}" placeholder="Search name, email..."
        style="flex: 1; min-width: 200px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">

      <!-- Department Filter -->
      <select name="department_id" style="padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
        <option value="">All Departments</option>
        @foreach($departments as $dept)
          <option value="{{ $dept->id }}" {{ request('department_id') == $dept->id ? 'selected' : '' }}>
            {{ $dept->name }}
          </option>
        @endforeach
      </select>

      <!-- Status Filter -->
      <select name="status" style="padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
        <option value="">All Status</option>
        <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Active</option>
        <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactive</option>
      </select>

      <button type="submit"
        style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Filter
      </button>

      <a href="/search" style="text-decoration: none; color: #666; font-size: 14px;">Reset</a>
    </form>


    <a href="{{ route('add') }}"
      style="padding: 5px 10px; background-color: #3b85f6; color: white; border: none; border-radius: 4px; cursor: pointer">
      Add Employee
    </a>

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
          <tr id="employee-row-{{ $emp->id }}">
            <td>{{ $emp->id }}</td>
            <td><strong>{{ $emp->name }}</strong></td>
            <td>{{ $emp->designation->name ?? 'N/A' }}</td>
            <td>{{ $emp->department->name ?? 'N/A' }}</td>
            <td>{{ $emp->email }}</td>
            <td>{{ $emp->phone }}</td>
            <td>
              <span class="badge {{ $emp->status }}">
                {{ $emp->status }}
              </span>
            </td>
            <td>
              <a href="{{ route('employee.edit', $emp->id) }}" class="btn-action">Edit</a>

              <!-- The AJAX Delete Button -->
              <button type="button" class="btn-action" style="color:red; border:none; background:none; cursor:pointer;"
                onclick="deleteEmployee({{ $emp->id }})">
                Delete
              </button>
            </td>
          </tr>

        @endforeach
      </tbody>
    </table>
  </div>

  <script>
    function deleteEmployee(id) {
      if (!confirm('Are you sure you want to delete this employee?')) return;

      fetch(`/employee/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': '{{ csrf_token() }}',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const row = document.getElementById(`employee-row-${id}`);
            row.style.transition = "all 0.4s ease";
            row.style.backgroundColor = "#fee2e2"; // Optional: turn red briefly
            row.style.opacity = "0";

            setTimeout(() => row.remove(), 400);
          } else {
            alert('Error: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Something went wrong!');
        });
    }
  </script>


</body>

</html>
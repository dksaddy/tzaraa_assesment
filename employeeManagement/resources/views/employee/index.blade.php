<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Management</title>
  <link rel="stylesheet" href="{{ asset('CSS/index.css') }}">
</head>

<body>

  @extends('employee.layout.layout')
  @section('content')

    <div class="container">
      <h2 style="text-align: center; margin-bottom: 10px; color: #1e293b;">Employee List</h2>

      <form action="/search" method="get" class="search"
        style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">

        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search name, email..."
          style="flex: 1; min-width: 200px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">

        <select name="department_id" style="padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
          <option value="">All Departments</option>
          @foreach($departments as $dept)
            <option value="{{ $dept->id }}" {{ request('department_id') == $dept->id ? 'selected' : '' }}>
              {{ $dept->name }}
            </option>
          @endforeach
        </select>

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
                <a href="{{ route('employee.edit', $emp->id) }}" class="btn-action">Full Edit</a>

                <button type="button" class="btn-action"
                  style="color:green; border: none; background: none; cursor: pointer;" onclick="openEditModal({{ $emp }})">
                  Edit
                </button>


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
  @endsection

  @push('scripts')
    @include('employee.partials.delete-script')
  @endpush

  @include('employee.partials.modal')

  <script>
    // 1. Open the Modal and fill data
    function openEditModal(employee) {
      document.getElementById('modal_name').value = employee.name;
      document.getElementById('modal_email').value = employee.email;
      document.getElementById('modal_phone').value = employee.phone;

      // Save the ID so the submit handler knows which row to update
      document.getElementById('simpleUpdateForm').dataset.employeeId = employee.id;

      const form = document.getElementById('simpleUpdateForm');
      form.action = `/employee/bio/${employee.id}`;

      document.getElementById('simpleEditModal').style.display = 'block';
    }

    function closeSimpleModal() {
      document.getElementById('simpleEditModal').style.display = 'none';
    }

    // 2. Handle Form Submission (Placed OUTSIDE openEditModal)
    document.getElementById('simpleUpdateForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const form = this;
      const employeeId = form.dataset.employeeId; // Get the ID we saved
      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': '{{ csrf_token() }}',
          'Accept': 'application/json'
        },
        body: new URLSearchParams([...formData])
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // 3. UPDATE THE TABLE ROW MANUALLY (No Reload)
            const row = document.getElementById(`employee-row-${employeeId}`);
            if (row) {
              // Update the specific cells (adjust the selectors to match your HTML)
              row.querySelector('td:nth-child(2) strong').innerText = data.employee.name;
              row.querySelector('td:nth-child(5)').innerText =  data.employee.email;
              row.querySelector('td:nth-child(6)').innerText =  data.employee.phone;

              const editBtn = row.querySelector('button[onclick^="openEditModal"]');
              if (editBtn) {
                // Pass the freshly updated data object back into the button
                editBtn.setAttribute('onclick', `openEditModal(${JSON.stringify(data.employee)})`);
              }
            }

            closeSimpleModal();
            console.log(data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Something went wrong!');
        });
    });
  </script>


</body>

</html>
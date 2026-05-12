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
            row.classList.add('deleting');
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

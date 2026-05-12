<script>
    document.getElementById('department_id').addEventListener('change', function () {
        let deptId = this.value;
        let designationSelect = document.getElementById('designation_id');

        //designationSelect.innerHTML = '<option value="">Loading...</option>';

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
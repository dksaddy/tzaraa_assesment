<div id="simpleEditModal"
    style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999;">
    <div
        style="background:white; width:350px; margin:100px auto; padding:20px; border-radius:10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
        <h3 style="margin-top:0;">Edit Employee</h3>

        <form id="simpleUpdateForm" method="POST">
            @csrf
            @method('PATCH')

            <div style="margin-bottom:15px;">
                <label>Name</label>
                <input type="text" name="name" id="modal_name"
                    style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
            </div>

            <div style="margin-bottom:15px;">
                <label>Email</label>
                <input type="email" name="email" id="modal_email"
                    style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
            </div>

            <div style="margin-bottom:15px;">
                <label>Phone</label>
                <input type="text" name="phone" id="modal_phone"
                    style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
            </div>

            <div style="display: flex; gap: 10px;">
                <button type="submit"
                    style="flex:1; background:#28a745; color:white; border:none; padding:10px; border-radius:4px; cursor:pointer;">Update</button>
                <button type="button" onclick="closeSimpleModal()"
                    style="flex:1; background:#6c757d; color:white; border:none; padding:10px; border-radius:4px; cursor:pointer;">Cancel</button>
            </div>
        </form>
    </div>
</div>
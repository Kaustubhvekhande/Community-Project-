// form.js

document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let issueType = document.getElementById('issueType').value;
    let description = document.getElementById('description').value;
    let address = document.getElementById('address').value;
    let locationInfo = document.getElementById('locationInfo').innerText;
    let photo = document.getElementById('photo').files[0];

    // Convert the photo to a Base64 string
    let reader = new FileReader();
    reader.onloadend = function() {
        let photoData = reader.result;

        // Create a new report object
        let newReport = {
            issueType: issueType,
            description: description,
            address: address,
            locationInfo: locationInfo,
            photoData: photoData
        };

        // Get existing reports from local storage
        let reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.push(newReport);

        // Save the updated reports back to local storage
        localStorage.setItem('reports', JSON.stringify(reports));

        // Alert the user and reset the form
        alert('Report submitted successfully!');
        document.getElementById('reportForm').reset();
        document.getElementById('locationInfo').innerText = '';
        document.getElementById('photoPreview').innerHTML = '';

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    };

    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        reader.onloadend();
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationInfo').innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById('locationInfo').innerText = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationInfo').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationInfo').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationInfo').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationInfo').innerText = "An unknown error occurred.";
            break;
    }
}

function previewImage(event) {
    let reader = new FileReader();
    reader.onload = function() {
        let output = document.createElement('img');
        output.src = reader.result;
        output.style.maxWidth = '100%';
        output.style.maxHeight = '200px';

        let photoPreview = document.getElementById('photoPreview');
        photoPreview.innerHTML = '';
        photoPreview.appendChild(output);
    };
    reader.readAsDataURL(event.target.files[0]);
}


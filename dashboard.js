// dashboard.js

function initDashboard() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('You need to log in to access the dashboard.');
        window.location.href = 'login.html';
        return;
    }

    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    // Populate table
    let tableBody = document.querySelector('#reportsTable tbody');
    reports.forEach(report => {
        let [latitude, longitude] = report.locationInfo.match(/Latitude: (-?\d+\.\d+), Longitude: (-?\d+\.\d+)/).slice(1, 3).map(Number);

        let row = document.createElement('tr');

        let issueTypeCell = document.createElement('td');
        issueTypeCell.textContent = report.issueType;
        row.appendChild(issueTypeCell);

        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = report.description;
        row.appendChild(descriptionCell);

        let addressCell = document.createElement('td');
        addressCell.textContent = report.address;
        row.appendChild(addressCell);

        let locationCell = document.createElement('td');
        locationCell.textContent = `Lat: ${latitude}, Lng: ${longitude}`;
        row.appendChild(locationCell);

        let photoCell = document.createElement('td');
        if (report.photoData) {
            let img = document.createElement('img');
            img.src = report.photoData;
            img.style.maxWidth = '100px';
            img.style.maxHeight = '100px';
            photoCell.appendChild(img);
        } else {
            photoCell.textContent = 'No photo';
        }
        row.appendChild(photoCell);

        tableBody.appendChild(row);
    });
}

function clearReports() {
    localStorage.removeItem('reports');
    location.reload();
}

document.addEventListener('DOMContentLoaded', initDashboard);

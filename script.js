document.getElementById('addPointBtn').addEventListener('click', function () {
    // Add a new point input (bearing and distance)
    const pointInputs = document.getElementById('pointInputs');
    const newPoint = document.createElement('div');
    newPoint.className = 'point';
    newPoint.innerHTML = `
        <label>Bearing (degrees):</label>
        <input type="number" class="bearing" placeholder="e.g. 45" required>
        <label>Distance (meters):</label>
        <input type="number" class="distance" placeholder="e.g. 200" required><br>
    `;
    pointInputs.appendChild(newPoint);
});

document.getElementById('computeBtn').addEventListener('click', function () {
    // Get input values for starting and ending coordinates
    const startX = parseFloat(document.getElementById('startX').value);
    const startY = parseFloat(document.getElementById('startY').value);
    const endX = parseFloat(document.getElementById('endX').value);
    const endY = parseFloat(document.getElementById('endY').value);

    let currentX = startX;
    let currentY = startY;

    const points = document.getElementsByClassName('point');
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = '';

    for (let i = 0; i < points.length; i++) {
        const bearing = parseFloat(points[i].querySelector('.bearing').value);
        const distance = parseFloat(points[i].querySelector('.distance').value);

        // Convert bearing to radians
        const bearingRad = bearing * (Math.PI / 180);

        // Compute new coordinates
        const deltaX = distance * Math.sin(bearingRad);
        const deltaY = distance * Math.cos(bearingRad);

        currentX += deltaX;
        currentY += deltaY;

        // Add the new computed point to the results
        const resultItem = document.createElement('li');
        resultItem.textContent = `Point ${i + 1}: X = ${currentX.toFixed(2)}, Y = ${currentY.toFixed(2)}`;
        resultList.appendChild(resultItem);
    }

    // Finally, output the end point
    const endItem = document.createElement('li');
    //endItem.textContent = `End Point: X = ${endX}, Y = ${endY}`;
    resultList.appendChild(endItem);
});

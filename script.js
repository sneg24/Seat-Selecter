// JavaScript for generating the seat map, managing selections, and simulating data sending

// Seat configuration
const rows = 6;
const seatsPerRow = 10;
let selectedSeats = [];

// Generate seat map
const seatMap = document.getElementById('seat-map');
for (let row = 0; row < rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.innerText = `${String.fromCharCode(65 + row)}${seat}`; // e.g., A1, B2
        seatDiv.dataset.seatId = `${String.fromCharCode(65 + row)}${seat}`;
        seatDiv.addEventListener('click', toggleSeatSelection);
        seatMap.appendChild(seatDiv);
    }
}

// Toggle seat selection
function toggleSeatSelection(event) {
    const seat = event.target;
    const seatId = seat.dataset.seatId;

    if (seat.classList.contains('occupied')) {
        return; // Skip if seat is occupied
    }

    // Toggle selection
    seat.classList.toggle('selected');
    if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
        selectedSeats.push(seatId);
    }

    updateSelectedSeatsDisplay();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    selectedSeatsDisplay.innerText = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
}

// Booking Button
document.getElementById('book-button').addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    // Simulate sending data to the server
    sendDataToServer(selectedSeats);
    alert(`Booking successful for seats: ${selectedSeats.join(', ')}`);

    // Clear selected seats after booking
    selectedSeats.forEach(seatId => {
        const seat = document.querySelector(`[data-seat-id="${seatId}"]`);
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    });
    selectedSeats = [];
    updateSelectedSeatsDisplay();
});

// Function to simulate sending data to the server
function sendDataToServer(seats) {
    console.log("Sending data to server: ", seats);
}

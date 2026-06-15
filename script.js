// Vehicle data
const vehicles = [
    {
        id: 1,
        name: 'Economy Car',
        type: 'economy',
        price: '$29/day',
        emoji: '🚗',
        features: ['4 Seats', 'Auto Transmission', 'Air Conditioning', 'Good Fuel Economy']
    },
    {
        id: 2,
        name: 'Sedan',
        type: 'sedan',
        price: '$49/day',
        emoji: '🚙',
        features: ['5 Seats', 'Cruise Control', 'Power Windows', 'Premium Sound']
    },
    {
        id: 3,
        name: 'SUV',
        type: 'suv',
        price: '$79/day',
        emoji: '🚌',
        features: ['7 Seats', 'All-Wheel Drive', 'Leather Interior', 'Navigation System']
    },
    {
        id: 4,
        name: 'Luxury Car',
        type: 'luxury',
        price: '$129/day',
        emoji: '🏎️',
        features: ['5 Seats', 'Premium Leather', 'Advanced Technology', 'Sunroof']
    }
];

// Load vehicles on page load
window.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
    setMinDates();
});

// Load vehicles
function loadVehicles() {
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    vehiclesGrid.innerHTML = '';

    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <div class="vehicle-image">${vehicle.emoji}</div>
            <div class="vehicle-info">
                <div class="vehicle-name">${vehicle.name}</div>
                <div class="vehicle-price">${vehicle.price}</div>
                <ul class="vehicle-features">
                    ${vehicle.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                </ul>
            </div>
        `;
        vehiclesGrid.appendChild(vehicleCard);
    });
}

// Set minimum dates for booking
function setMinDates() {
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    const today = new Date().toISOString().split('T')[0];
    
    pickupDate.setAttribute('min', today);
    returnDate.setAttribute('min', today);
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const vehicleType = document.getElementById('vehicleType').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!vehicleType) {
        alert('Please select a vehicle type');
        return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
        alert('Return date must be after pickup date');
        return;
    }

    // Create booking summary
    const bookingSummary = `
        Booking Confirmation:
        ==================
        Vehicle: ${vehicleType}
        Pickup Date: ${pickupDate}
        Return Date: ${returnDate}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Thank you for your booking!
    `;

    alert(bookingSummary);
    
    // Save booking to localStorage
    const booking = {
        vehicleType,
        pickupDate,
        returnDate,
        name,
        email,
        phone,
        bookingDate: new Date().toISOString()
    };
    
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Reset form
    document.getElementById('bookingForm').reset();
    console.log('Booking saved successfully');
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scroll for navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});
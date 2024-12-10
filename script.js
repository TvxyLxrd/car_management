function login() {
    const carId = document.getElementById('login-car-id').value;
    const messageElement = document.getElementById('login-message');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                if (response.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    localStorage.setItem('currentCar', JSON.stringify(response.car));
                    window.location.href = 'user.html';
                }
            } else {
                messageElement.textContent = 'Неверный ID автомобиля.';
            }
        }
    };
    xhr.send(`car_id=${carId}`);
}

function addCar() {
    const carId = document.getElementById('car-id').value;
    const owner = document.getElementById('owner').value;
    const messageElement = document.getElementById('admin-message');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_car.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                updateCarList();
                document.getElementById('car-id').value = '';
                document.getElementById('owner').value = '';
                messageElement.textContent = '';
            } else {
                messageElement.textContent = response.message;
            }
        }
    };
    xhr.send(`car_id=${carId}&owner=${owner}`);
}

function addViolation() {
    const carId = document.getElementById('car-id-violation').value;
    const date = document.getElementById('violation-date').value;
    const time = document.getElementById('violation-time').value;
    const type = document.getElementById('violation-type').value;
    const fine = document.getElementById('violation-fine').value;
    const messageElement = document.getElementById('violation-message');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_violation.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                updateCarList();
                document.getElementById('car-id-violation').value = '';
                document.getElementById('violation-date').value = '';
                document.getElementById('violation-time').value = '';
                document.getElementById('violation-type').value = '';
                document.getElementById('violation-fine').value = '';
                messageElement.textContent = '';
            } else {
                messageElement.textContent = response.message;
            }
        }
    };
    xhr.send(`car_id=${carId}&date=${date}&time=${time}&type=${type}&fine=${fine}`);
}

function payFines() {
    const currentCar = JSON.parse(localStorage.getItem('currentCar'));
    const messageElement = document.getElementById('payment-message');

    if (currentCar) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'pay_fines.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    localStorage.removeItem('currentCar');
                    window.location.href = 'index.html';
                } else {
                    messageElement.textContent = response.message;
                }
            }
        };
        xhr.send(`car_id=${currentCar.car_id}`);
    }
}

function updateCarList() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_cars.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const cars = JSON.parse(xhr.responseText);
            const carListItems = document.getElementById('car-list-items');
            carListItems.innerHTML = '';
            cars.forEach(car => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>ID:</strong> ${car.car_id}, <strong>Владелец:</strong> ${car.owner}<br>
                                <strong>Нарушения:</strong><ul>${car.violations.map(v => `<li>${v.date} ${v.time} - ${v.type} (${v.fine} руб.)</li>`).join('')}</ul>`;
                carListItems.appendChild(li);
            });
        }
    };
    xhr.send();
}

function loadUserCar() {
    const currentCar = JSON.parse(localStorage.getItem('currentCar'));
    if (currentCar) {
        const carInfoElement = document.getElementById('car-info');
        const violationListElement = document.getElementById('violation-list');

        carInfoElement.textContent = `ID: ${currentCar.car_id}, Владелец: ${currentCar.owner}`;

        const violations = JSON.parse(currentCar.violations);
        violationListElement.innerHTML = '';
        violations.forEach(violation => {
            const li = document.createElement('li');
            li.textContent = `${violation.date} ${violation.time} - ${violation.type} (${violation.fine} руб.)`;
            violationListElement.appendChild(li);
        });
    }
}

window.onload = function() {
    if (window.location.pathname.includes('admin.html')) {
        updateCarList();
    } else if (window.location.pathname.includes('user.html')) {
        loadUserCar();
    }
};

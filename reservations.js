
let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    renderReservations();

    document.querySelector('.btn-primary').addEventListener('click', () => {
        const inputs = document.querySelectorAll('.form-input');
        const [nameInput, checkinInput, checkoutInput, roomTypeInput, guestCountInput, amountInput] = inputs;

        const name = nameInput.value.trim();
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const roomType = roomTypeInput.value;
        const guestCount = guestCountInput.value;
        const amount = parseFloat(amountInput.value);

        if (!name || !checkin || !checkout || !roomType || !guestCount || !amount) {
            alert("يرجى ملء جميع الحقول!");
            return;
        }

        const roomNumber = Math.floor(Math.random() * 300) + 100;

        const newReservation = {
            name,
            checkin,
            checkout,
            room: roomNumber,
            guestCount,
            roomType,
            amount,
            status: "مؤكد"
        };

        if (editIndex !== null) {
            reservations[editIndex] = newReservation;
            editIndex = null;
        } else {
            reservations.push(newReservation);
        }

        localStorage.setItem("reservations", JSON.stringify(reservations));
        renderReservations();
        inputs.forEach(input => input.value = "");
        document.querySelector('.btn-primary').textContent = "إضافة الحجز";
    });
});

function renderReservations() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = "";

    reservations.forEach((res, index) => {
        const row = `
        <tr class="border-t">
            <td class="p-3">#${index + 1}</td>
            <td class="p-3">${res.name}</td>
            <td class="p-3">${res.room}</td>
            <td class="p-3">${res.checkin}</td>
            <td class="p-3">${res.checkout}</td>
            <td class="p-3">${res.amount.toLocaleString()} دج</td>
            <td class="p-3"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">${res.status}</span></td>
            <td class="p-3">
                <button class="text-blue-600 ml-2" onclick="editReservation(${index})"><i class="fas fa-edit"></i></button>
                <button class="text-red-600" onclick="deleteReservation(${index})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function deleteReservation(index) {
    if (confirm("هل تريد حذف هذا الحجز؟")) {
        reservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(reservations));
        renderReservations();
    }
}

function editReservation(index) {
    const res = reservations[index];
    const inputs = document.querySelectorAll('.form-input');
    const [nameInput, checkinInput, checkoutInput, roomTypeInput, guestCountInput, amountInput] = inputs;

    nameInput.value = res.name;
    checkinInput.value = res.checkin;
    checkoutInput.value = res.checkout;
    roomTypeInput.value = res.roomType;
    guestCountInput.value = res.guestCount;
    amountInput.value = res.amount;

    editIndex = index;
    document.querySelector('.btn-primary').textContent = "تعديل الحجز";
}

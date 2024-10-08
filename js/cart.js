

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Funktion zum Aktualisieren des Warenkorbs auf der cart.html-Seite
function updateCart() {
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = ""; // Leeren des Warenkorb-Inhalts

    let totalPrice = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item, index) => {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;

        // Erstellen der Tabellenzeile für das Produkt im Warenkorb
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>${itemPrice}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;

        // Hinzufügen der Tabellenzeile zum Warenkorb
        cartBody.appendChild(row);
    });

    // Aktualisieren des Gesamtpreises
    document.getElementById("totalPrice").textContent = totalPrice;
}

// Warenkorb beim Laden der Seite aktualisieren
updateCart();

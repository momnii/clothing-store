//Newsletter 
function newsletter(){
    let input = document.getElementById("email").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (input !== ""&& emailPattern.test(input)){
        document.getElementById("ausgabe").innerHTML= `
Wir haben den Newsletter an ${input} geschickt.`;
    } else {
        alert("Bitte gib eine gültige E-Mail-Adresse ein.");
    }
}

// rechte Seitenleiste einblenden
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cart-button').addEventListener('click', function () {
        const cartSection = document.getElementById('cart-section');
        cartSection.classList.add('show');
    });

    document.getElementById('close-button').addEventListener('click', function () {
        const cartSection = document.getElementById('cart-section');
        cartSection.classList.remove('show');
    });
});

//Message dass ein Produkt im Warenkorb hinzugefügt worden ist
function showNotification(message, duration) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Warenkorb (Produkte hinzufügen)
function addToCart(productName, price, imageSrc, inputId, sizeId) {
    let size = " "; 
    let quantity = parseInt(document.getElementById(inputId).value);; 

    
    if (sizeId) {
        size = document.getElementById(sizeId).value; 
       
    }
  
    const item = { productName, size, quantity, price, imageSrc };
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    showNotification(`${productName} wurde erfolgreich zum Warenkorb hinzugefügt!`, 3000); // Die Benachrichtigung wird für 3 Sekunden angezeigt

  
    updateCart();
}

// Warenkorb (Produkte entfernen)  
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}
 
// Warenkorb aktualisieren
function updateCart() {
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = ""; 
  
    let totalPrice = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item, index) => {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
  
      // Tabellenzeile für jedes Produkt
      const cartRow = document.createElement("tr");
      cartRow.innerHTML = `
        <td><img src="${item.imageSrc}" alt="${item.productName}"></td>
        <td>${item.size}</td>
        <td>${item.quantity}</td>
        <td>${itemPrice} $</td>
        <td><button class="removeBtn" onclick="removeFromCart(${index})">Remove</button></td>
      `;
      cartBody.appendChild(cartRow);
    });
  
    // Aktualisieren des Gesamtpreises 
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = totalPrice + "$";
}
  

updateCart();

// Nachricht dass der Kauf abgeschlossen ist (W3 schools - Toggle an Element (leichte Abänderung))
function myFunction() {
    var x = document.getElementById("myDIV");
    var totalPrice = parseFloat(document.getElementById("totalPrice").textContent); // Gesamtsumme des Warenkorbs auslesen

    if (totalPrice !== 0){
    x.style.display = "block"; 
   
    setTimeout(function() { 
      x.style.display = "none"; 
    }, 2000);
    }
    // Warenkorb leeren
    localStorage.removeItem('cart');
    updateCart();
}



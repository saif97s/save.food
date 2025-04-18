// تهيئة الخريطة
function initMap() {
    const map = L.map('map').setView([24.7136, 46.6753], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // إضافة العلامات للوجبات
    fetch('/api/meals')
        .then(response => response.json())
        .then(meals => {
            meals.forEach(meal => {
                const marker = L.marker([meal.lat, meal.lng]).addTo(map);
                marker.bindPopup(`
                    <h3>${meal.name}</h3>
                    <p>${meal.restaurant}</p>
                    <p>السعر: ${meal.price} ريال</p>
                    <button onclick="openOrderModal(${meal.id})" class="btn btn-small">احجز الآن</button>
                `);
            });
        });
    
    // إذا كان المتصفح يدعم تحديد الموقع
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            map.setView([position.coords.latitude, position.coords.longitude], 14);
        });
    }
}

// استدعاء تهيئة الخريطة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initMap);
// متغيرات عامة
let currentOrder = null;

// تهيئة النموذج المنبثق
const modal = document.getElementById('order-modal');
const closeBtn = document.querySelector('.close');

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// تهيئة نظام الدفع
function initializePayment(stripe, mealId, amount) {
    const elements = stripe.elements();
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
    
    const form = document.getElementById('order-form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const submitButton = document.getElementById('submit-order');
        submitButton.disabled = true;
        
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
                receipt_email: document.getElementById('email').value,
            },
        });
        
        if (error) {
            submitButton.disabled = false;
            alert(error.message);
        } else {
            // حفظ البيانات في قاعدة البيانات
            saveOrder(mealId);
        }
    });
}

// حفظ الطلب في قاعدة البيانات
function saveOrder(mealId) {
    const orderData = {
        customer_name: document.getElementById('name').value,
        customer_email: document.getElementById('email').value,
        customer_phone: document.getElementById('phone').value,
        meal_id: mealId
    };
    
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/success';
        } else {
            alert('حدث خطأ أثناء حفظ الطلب');
        }
    });
}

// فتح النموذج المنبثق للحجز
function openOrderModal(mealId) {
    fetch(`/api/meals/${mealId}`)
        .then(response => response.json())
        .then(meal => {
            document.getElementById('modal-meal-name').textContent = meal.name;
            document.getElementById('modal-meal-restaurant').textContent = meal.restaurant;
            document.getElementById('modal-meal-price').textContent = `${meal.price} ريال`;
            document.getElementById('modal-meal-time').textContent = `وقت الاستلام: ${meal.pickup_time}`;
            document.getElementById('modal-meal-image').src = meal.image || '/static/img/default-food.jpg';
            
            currentOrder = meal;
            modal.style.display = 'block';
        });
}
// تهيئة خريطة Mapbox
mapboxgl.accessToken = 'your_mapbox_access_token';

function initDeliveryMap(orderId, restaurantLocation, customerLocation) {
    const map = new mapboxgl.Map({
        container: 'delivery-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: restaurantLocation,
        zoom: 12
    });

    // إضافة علامة المطعم
    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(restaurantLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>المطعم</h3>'))
        .addTo(map);

    // إضافة علامة العميل
    new mapboxgl.Marker({ color: 'green' })
        .setLngLat(customerLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>موقع العميل</h3>'))
        .addTo(map);

    // رسم مسار التوصيل
    fetchDeliveryRoute(restaurantLocation, customerLocation).then(route => {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3b82f6',
                'line-width': 4
            }
        });
    });

    // تحديث موقع المندوب في الوقت الحقيقي
    const driverMarker = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(restaurantLocation)
        .addTo(map);

    // محاكاة تحديث موقع المندوب (في الواقع سيأتي من التطبيق الخاص بالمندوب)
    setInterval(() => {
        fetch(`/api/driver-location?order_id=${orderId}`)
            .then(res => res.json())
            .then(data => {
                if (data.location) {
                    driverMarker.setLngLat(data.location);
                    
                    // تحريك الخريطة لمركزة على المندوب
                    map.flyTo({
                        center: data.location,
                        zoom: 14
                    });
                }
            });
    }, 5000);
}

async function fetchDeliveryRoute(start, end) {
    // استدعاء Mapbox Directions API
    const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    return data.routes[0].geometry.coordinates;
}

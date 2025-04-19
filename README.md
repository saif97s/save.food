# save.food<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طعام بخصم - منع هدر الطعام</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
    <style>
        :root {
            --primary: #4CAF50;
            --primary-dark: #388E3C;
            --secondary: #FFC107;
            --dark: #212121;
            --light: #F5F5F5;
            --gray: #757575;
            --white: #FFFFFF;
            --danger: #F44336;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }

        /* التنسيقات العامة */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            font-weight: 500;
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--white);
        }

        .btn-primary:hover {
            background-color: var(--primary-dark);
        }

        .btn-outline {
            background-color: transparent;
            border: 1px solid var(--primary);
            color: var(--primary);
        }

        .btn-outline:hover {
            background-color: var(--primary);
            color: var(--white);
        }

        .btn-secondary {
            background-color: var(--secondary);
            color: var(--dark);
        }

        .text-center {
            text-align: center;
        }

        .mt-3 {
            margin-top: 1rem;
        }

        .mb-3 {
            margin-bottom: 1rem;
        }

        .p-3 {
            padding: 1rem;
        }

        .d-flex {
            display: flex;
        }

        .justify-content-between {
            justify-content: space-between;
        }

        .align-items-center {
            align-items: center;
        }

        /* الهيدر */
        header {
            background-color: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 20px;
        }

        .nav-links a {
            color: var(--dark);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        .auth-buttons {
            display: flex;
            gap: 10px;
        }

        /* الهيرو */
        .hero {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
            background-size: cover;
            background-position: center;
            color: var(--white);
            padding: 100px 0;
            text-align: center;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
        }

        /* قسم العروض */
        .offers-section {
            padding: 60px 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2rem;
            color: var(--dark);
        }

        .filter-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .search-box {
            flex: 1;
            min-width: 300px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            padding-right: 40px;
        }

        .search-box i {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
        }

        .filter-options {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .filter-options select {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            background-color: var(--white);
        }

        .offers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
        }

        .offer-card {
            background-color: var(--white);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .offer-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .offer-img {
            height: 180px;
            width: 100%;
            object-fit: cover;
        }

        .offer-details {
            padding: 15px;
        }

        .offer-title {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: var(--dark);
        }

        .offer-restaurant {
            color: var(--gray);
            margin-bottom: 10px;
            font-size: 0.9rem;
        }

        .offer-price {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }

        .original-price {
            text-decoration: line-through;
            color: var(--gray);
            font-size: 0.9rem;
        }

        .discount-price {
            font-weight: bold;
            color: var(--primary);
            font-size: 1.1rem;
        }

        .offer-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .pickup-time {
            font-size: 0.9rem;
            color: var(--gray);
        }

        /* الخريطة */
        .map-container {
            height: 500px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            margin-top: 30px;
        }

        /* لوحة المطعم */
        .dashboard {
            padding: 40px 0;
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .stats-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background-color: var(--white);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
            font-size: 0.9rem;
            color: var(--gray);
            margin-bottom: 10px;
        }

        .stat-card p {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--dark);
        }

        .orders-table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--white);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .orders-table th, .orders-table td {
            padding: 15px;
            text-align: right;
            border-bottom: 1px solid #eee;
        }

        .orders-table th {
            background-color: var(--light);
            font-weight: 500;
        }

        .orders-table tr:last-child td {
            border-bottom: none;
        }

        .status-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .status-pending {
            background-color: #FFF3E0;
            color: #E65100;
        }

        .status-delivered {
            background-color: #E8F5E9;
            color: #2E7D32;
        }

        .status-in-progress {
            background-color: #E3F2FD;
            color: #1565C0;
        }

        /* النموذج المنبثق */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 2000;
            overflow-y: auto;
        }

        .modal-content {
            background-color: var(--white);
            margin: 50px auto;
            max-width: 600px;
            border-radius: 10px;
            overflow: hidden;
            animation: modalFadeIn 0.3s;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
            padding: 15px 20px;
            background-color: var(--primary);
            color: var(--white);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h2 {
            font-size: 1.3rem;
        }

        .close-btn {
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.5rem;
            cursor: pointer;
        }

        .modal-body {
            padding: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }

        .payment-methods {
            margin: 20px 0;
        }

        .payment-method {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .payment-method:hover {
            border-color: var(--primary);
        }

        .payment-method.selected {
            border-color: var(--primary);
            background-color: rgba(76, 175, 80, 0.1);
        }

        .payment-method i {
            font-size: 1.5rem;
            margin-left: 15px;
            color: var(--primary);
        }

        .payment-method .method-details {
            flex: 1;
        }

        .payment-method .method-title {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .payment-method .method-desc {
            font-size: 0.9rem;
            color: var(--gray);
        }

        /* نظام التقييم */
        .rating-stars {
            direction: ltr;
            margin: 20px 0;
            text-align: center;
        }

        .rating-stars .star {
            font-size: 2rem;
            color: #ddd;
            cursor: pointer;
            transition: color 0.2s;
            display: inline-block;
        }

        .rating-stars .star:hover, 
        .rating-stars .star.active {
            color: var(--secondary);
        }

        /* نظام الولاء */
        .loyalty-card {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: var(--white);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .loyalty-card h3 {
            margin-bottom: 10px;
        }

        .loyalty-points {
            font-size: 2rem;
            font-weight: bold;
            margin: 10px 0;
        }

        .progress-bar {
            height: 10px;
            background-color: rgba(255,255,255,0.3);
            border-radius: 5px;
            margin: 15px 0;
            overflow: hidden;
        }

        .progress {
            height: 100%;
            background-color: var(--secondary);
            border-radius: 5px;
            width: 30%;
        }

        .loyalty-rewards {
            margin-top: 20px;
        }

        .reward-item {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .reward-item:last-child {
            border-bottom: none;
        }

        .reward-item i {
            margin-left: 10px;
            color: var(--secondary);
        }

        /* التتبع المباشر */
        .tracking-container {
            margin-top: 30px;
        }

        .tracking-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .tracking-steps {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-bottom: 30px;
        }

        .tracking-steps::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #ddd;
            z-index: 1;
        }

        .tracking-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .step-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            color: var(--white);
        }

        .step-icon.active {
            background-color: var(--primary);
        }

        .step-label {
            font-size: 0.9rem;
            color: var(--gray);
        }

        .step-label.active {
            color: var(--dark);
            font-weight: 500;
        }

        .driver-info {
            display: flex;
            align-items: center;
            background-color: var(--white);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .driver-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-left: 15px;
        }

        .driver-details h4 {
            margin-bottom: 5px;
        }

        .driver-rating {
            color: var(--secondary);
            margin-top: 5px;
        }

        .driver-actions {
            margin-top: 20px;
        }

        /* الفوتر */
        footer {
            background-color: var(--dark);
            color: var(--white);
            padding: 50px 0 20px;
            margin-top: 50px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
        }

        .footer-column h3 {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: var(--white);
        }

        .footer-column ul {
            list-style: none;
        }

        .footer-column ul li {
            margin-bottom: 10px;
        }

        .footer-column ul li a {
            color: #bdbdbd;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-column ul li a:hover {
            color: var(--white);
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }

        .social-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.1);
            color: var(--white);
            transition: all 0.3s;
        }

        .social-links a:hover {
            background-color: var(--primary);
            transform: translateY(-3px);
        }

        .copyright {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #bdbdbd;
            font-size: 0.9rem;
        }

        /* التجاوب */
        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                gap: 15px;
            }

            .nav-links {
                flex-wrap: wrap;
                justify-content: center;
            }

            .hero {
                padding: 70px 0;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .filter-bar {
                flex-direction: column;
            }

            .search-box {
                min-width: 100%;
            }

            .modal-content {
                margin: 20px auto;
                width: 95%;
            }
        }
    </style>
</head>
<body>
    <!-- الهيدر -->
    <header>
        <div class="container">
            <nav class="navbar">
                <a href="#" class="logo">طعام بخصم</a>
                <div class="nav-links">
                    <a href="#offers">العروض</a>
                    <a href="#how-it-works">كيف يعمل</a>
                    <a href="#restaurants">المطاعم</a>
                    <a href="#about">عن المبادرة</a>
                </div>
                <div class="auth-buttons">
                    <button class="btn btn-outline">تسجيل الدخول</button>
                    <button class="btn btn-primary">إنشاء حساب</button>
                </div>
            </nav>
        </div>
    </header>

    <!-- قسم الهيرو -->
    <section class="hero">
        <div class="container">
            <h1>أنقذ الطعام، وفر المال</h1>
            <p>اشتر وجبات عالية الجودة من مطاعمك المفضلة بأسعار مخفضة وساعد في تقليل هدر الطعام في مدينتك</p>
            <button class="btn btn-primary btn-large">تصفح العروض القريبة</button>
        </div>
    </section>

    <!-- قسم العروض -->
    <section id="offers" class="offers-section">
        <div class="container">
            <h2 class="section-title">العروض المتاحة اليوم</h2>
            
            <div class="filter-bar">
                <div class="search-box">
                    <input type="text" placeholder="ابحث عن وجبة أو مطعم...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="filter-options">
                    <select>
                        <option value="">كل الفئات</option>
                        <option value="arabic">أطعمة عربية</option>
                        <option value="international">أطعمة عالمية</option>
                        <option value="desserts">حلويات</option>
                    </select>
                    <select>
                        <option value="">كل الأوقات</option>
                        <option value="breakfast">فطور</option>
                        <option value="lunch">غداء</option>
                        <option value="dinner">عشاء</option>
                    </select>
                    <select>
                        <option value="">كل المناطق</option>
                        <option value="north">المنطقة الشمالية</option>
                        <option value="south">المنطقة الجنوبية</option>
                        <option value="east">المنطقة الشرقية</option>
                        <option value="west">المنطقة الغربية</option>
                    </select>
                </div>
            </div>
            
            <div class="offers-grid">
                <!-- عرض 1 -->
                <div class="offer-card">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt="وجبة" class="offer-img">
                    <div class="offer-details">
                        <h3 class="offer-title">ساندويش دجاج مشوي</h3>
                        <p class="offer-restaurant">مطعم الوجبات الصحية</p>
                        <div class="offer-price">
                            <span class="original-price">35 ريال</span>
                            <span class="discount-price">20 ريال</span>
                        </div>
                        <div class="offer-footer">
                            <span class="pickup-time"><i class="far fa-clock"></i> 18:00 - 19:30</span>
                            <button class="btn btn-primary btn-small" onclick="openOrderModal(1)">احجز الآن</button>
                        </div>
                    </div>
                </div>
                
                <!-- عرض 2 -->
                <div class="offer-card">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80" alt="وجبة" class="offer-img">
                    <div class="offer-details">
                        <h3 class="offer-title">بيتزا خضار</h3>
                        <p class="offer-restaurant">بيتزا إيطاليا</p>
                        <div class="offer-price">
                            <span class="original-price">45 ريال</span>
                            <span class="discount-price">25 ريال</span>
                        </div>
                        <div class="offer-footer">
                            <span class="pickup-time"><i class="far fa-clock"></i> 19:00 - 20:30</span>
                            <button class="btn btn-primary btn-small" onclick="openOrderModal(2)">احجز الآن</button>
                        </div>
                    </div>
                </div>
                
                <!-- عرض 3 -->
                <div class="offer-card">
                    <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80" alt="وجبة" class="offer-img">
                    <div class="offer-details">
                        <h3 class="offer-title">سوشي متنوع</h3>
                        <p class="offer-restaurant">مطعم اليابان</p>
                        <div class="offer-price">
                            <span class="original-price">60 ريال</span>
                            <span class="discount-price">35 ريال</span>
                        </div>
                        <div class="offer-footer">
                            <span class="pickup-time"><i class="far fa-clock"></i> 17:30 - 19:00</span>
                            <button class="btn btn-primary btn-small" onclick="openOrderModal(3)">احجز الآن</button>
                        </div>
                    </div>
                </div>
                
                <!-- عرض 4 -->
                <div class="offer-card">
                    <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80" alt="وجبة" class="offer-img">
                    <div class="offer-details">
                        <h3 class="offer-title">برجر لحم</h3>
                        <p class="offer-restaurant">برجر تاون</p>
                        <div class="offer-price">
                            <span class="original-price">30 ريال</span>
                            <span class="discount-price">18 ريال</span>
                        </div>
                        <div class="offer-footer">
                            <span class="pickup-time"><i class="far fa-clock"></i> 18:30 - 20:00</span>
                            <button class="btn btn-primary btn-small" onclick="openOrderModal(4)">احجز الآن</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- خريطة العروض -->
            <div class="map-container" id="map"></div>
        </div>
    </section>

    <!-- قسم كيف يعمل -->
    <section id="how-it-works" class="how-it-works" style="background-color: #f9f9f9; padding: 60px 0;">
        <div class="container">
            <h2 class="section-title">كيف يعمل البرنامج؟</h2>
            <div class="steps-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px;">
                <div class="step" style="text-align: center; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 15px;">
                        <i class="fas fa-store"></i>
                    </div>
                    <h3 style="margin-bottom: 10px;">المطاعم تضيف وجباتها الفائضة</h3>
                    <p style="color: var(--gray);">تقوم المطاعم بإضافة الوجبات التي لديها فائض منها بأسعار مخفضة تصل إلى 50%.</p>
                </div>
                <div class="step" style="text-align: center; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 15px;">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 style="margin-bottom: 10px;">العملاء يكتشفون العروض</h3>
                    <p style="color: var(--gray);">يمكنك تصفح العروض المتاحة في مطاعم قريبة منك عبر التطبيق أو الموقع.</p>
                </div>
                <div class="step" style="text-align: center; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 15px;">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <h3 style="margin-bottom: 10px;">الحجز والاستلام</h3>
                    <p style="color: var(--gray);">احجز وجبتك وادفع إلكترونياً أو نقداً عند الاستلام، ثم استلمها في الوقت المحدد.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- قسم نظام الولاء -->
    <section class="loyalty-section" style="padding: 60px 0; background-color: var(--primary); color: white;">
        <div class="container">
            <h2 class="section-title" style="color: white;">برنامج الولاء</h2>
            <div class="loyalty-card">
                <h3>نقاط الولاء الخاصة بك</h3>
                <div class="loyalty-points">250 نقطة</div>
                <div class="progress-bar">
                    <div class="progress" style="width: 50%;"></div>
                </div>
                <p>تحتاج إلى 50 نقطة أخرى للحصول على خصم 10% على طلبك القادم</p>
                
                <div class="loyalty-rewards">
                    <h4 style="margin-bottom: 15px;">المكافآت المتاحة:</h4>
                    <div class="reward-item">
                        <i class="fas fa-gift"></i>
                        <div>
                            <h5 style="margin-bottom: 5px;">100 نقطة</h5>
                            <p style="font-size: 0.9rem;">كوبون خصم 5%</p>
                        </div>
                    </div>
                    <div class="reward-item">
                        <i class="fas fa-gift"></i>
                        <div>
                            <h5 style="margin-bottom: 5px;">300 نقطة</h5>
                            <p style="font-size: 0.9rem;">كوبون خصم 10%</p>
                        </div>
                    </div>
                    <div class="reward-item">
                        <i class="fas fa-gift"></i>
                        <div>
                            <h5 style="margin-bottom: 5px;">500 نقطة</h5>
                            <p style="font-size: 0.9rem;">وجبة مجانية</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- الفوتر -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>طعام بخصم</h3>
                    <p>منصة تهدف إلى تقليل هدر الطعام عن طريق ربط المطاعم مع العملاء لبيع الوجبات الفائضة بأسعار مخفضة.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>روابط سريعة</h3>
                    <ul>
                        <li><a href="#">الصفحة الرئيسية</a></li>
                        <li><a href="#offers">العروض</a></li>
                        <li><a href="#how-it-works">كيف يعمل</a></li>
                        <li><a href="#">المطاعم الشريكة</a></li>
                        <li><a href="#">انضم كمطعم</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>الدعم</h3>
                    <ul>
                        <li><a href="#">الأسئلة الشائعة</a></li>
                        <li><a href="#">اتصل بنا</a></li>
                        <li><a href="#">سياسة الخصوصية</a></li>
                        <li><a href="#">شروط الاستخدام</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>تواصل معنا</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> الرياض، المملكة العربية السعودية</li>
                        <li><i class="fas fa-phone"></i> +966 12 345 6789</li>
                        <li><i class="fas fa-envelope"></i> info@fooddiscount.com</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2023 طعام بخصم. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>

    <!-- نموذج الحجز -->
    <div id="orderModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>احجز وجبتك</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="meal-details" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <img id="modalMealImg" src="" alt="صورة الوجبة" style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <h3 id="modalMealName" style="margin-bottom: 5px;"></h3>
                        <p id="modalMealRestaurant" style="color: var(--gray); margin-bottom: 10px;"></p>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span id="modalMealOriginalPrice" style="text-decoration: line-through; color: var(--gray);"></span>
                            <span id="modalMealDiscountPrice" style="font-weight: bold; color: var(--primary); font-size: 1.2rem;"></span>
                        </div>
                        <p id="modalMealTime" style="color: var(--gray);"><i class="far fa-clock"></i> <span id="pickupTime"></span></p>
                    </div>
                </div>
                
                <form id="orderForm">
                    <div class="form-group">
                        <label for="name">الاسم الكامل</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">البريد الإلكتروني</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">رقم الجوال</label>
                        <input type="tel" id="phone" required>
                    </div>
                    
                    <div class="payment-methods">
                        <h3 style="margin-bottom: 15px;">طريقة الدفع</h3>
                        
                        <div class="payment-method" onclick="selectPaymentMethod('card')">
                            <i class="fab fa-cc-mastercard"></i>
                            <div class="method-details">
                                <div class="method-title">بطاقة ائتمان / مدى</div>
                                <div class="method-desc">الدفع الآمن عبر ماستركارد، فيزا أو مدى</div>
                            </div>
                        </div>
                        
                        <div class="payment-method" onclick="selectPaymentMethod('cash')">
                            <i class="fas fa-money-bill-wave"></i>
                            <div class="method-details">
                                <div class="method-title">الدفع نقدًا عند الاستلام</div>
                                <div class="method-desc">ادفع عند استلام الطلب من المطعم</div>
                            </div>
                        </div>
                        
                        <input type="hidden" id="paymentMethod" value="">
                    </div>
                    
                    <div id="cardPaymentSection" style="display: none; margin-top: 20px;">
                        <div class="form-group">
                            <label for="cardNumber">رقم البطاقة</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div class="form-group">
                                <label for="expiryDate">تاريخ الانتهاء</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123">
                            </div>
                        </div>
                    </div>
                    
                    <div id="cashPaymentSection" style="display: none; margin-top: 20px; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                        <p style="color: var(--gray); text-align: center;">
                            <i class="fas fa-info-circle" style="color: var(--primary);"></i>
                            سيتم الدفع نقدًا عند استلام الطلب من المطعم
                        </p>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 12px;">تأكيد الحجز</button>
                </form>
            </div>
        </div>
    </div>

    <!-- نموذج التتبع -->
    <div id="trackingModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>تتبع طلبك</h2>
                <button class="close-btn" onclick="closeTrackingModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tracking-container">
                    <div class="tracking-header">
                        <h3>طلب #12345</h3>
                        <span class="status-badge status-in-progress">قيد التوصيل</span>
                    </div>
                    
                    <div class="tracking-steps">
                        <div class="tracking-step">
                            <div class="step-icon active"><i class="fas fa-check"></i></div>
                            <span class="step-label active">تم الطلب</span>
                        </div>
                        <div class="tracking-step">
                            <div class="step-icon active"><i class="fas fa-check"></i></div>
                            <span class="step-label active">قيد التحضير</span>
                        </div>
                        <div class="tracking-step">
                            <div class="step-icon active"><i class="fas fa-check"></i></div>
                            <span class="step-label active">تم التوصيل</span>
                        </div>
                    </div>
                    
                    <div class="driver-info">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="المندوب" class="driver-avatar">
                        <div class="driver-details">
                            <h4>أحمد محمد</h4>
                            <p>مندوب التوصيل</p>
                            <div class="driver-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <span>4.5</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="map-container" id="deliveryMap" style="height: 300px;"></div>
                    
                    <div class="driver-actions">
                        <button class="btn btn-outline" style="margin-right: 10px;"><i class="fas fa-phone"></i> اتصل بالمندوب</button>
                        <button class="btn btn-primary"><i class="fas fa-comment"></i> محادثة</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- نموذج التقييم -->
    <div id="ratingModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>قيم تجربتك</h2>
                <button class="close-btn" onclick="closeRatingModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="meal-details" style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt="صورة الوجبة" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <h3 style="margin-bottom: 5px;">ساندويش دجاج مشوي</h3>
                        <p style="color: var(--gray); margin-bottom: 10px;">مطعم الوجبات الصحية</p>
                        <p style="color: var(--gray);"><i class="far fa-clock"></i> 18:00 - 19:30</p>
                    </div>
                </div>
                
                <form id="ratingForm">
                    <div class="rating-stars">
                        <span class="star" onclick="rate(1)"><i class="far fa-star"></i></span>
                        <span class="star" onclick="rate(2)"><i class="far fa-star"></i></span>
                        <span class="star" onclick="rate(3)"><i class="far fa-star"></i></span>
                        <span class="star" onclick="rate(4)"><i class="far fa-star"></i></span>
                        <span class="star" onclick="rate(5)"><i class="far fa-star"></i></span>
                        <input type="hidden" id="ratingValue" value="0">
                    </div>
                    
                    <div class="form-group" style="margin-top: 20px;">
                        <label for="reviewComment">تعليقك (اختياري)</label>
                        <textarea id="reviewComment" rows="4" placeholder="كيف كانت تجربتك؟"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 12px;">إرسال التقييم</button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
    <script>
        // تهيئة الخريطة
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [46.6753, 24.7136], // الرياض
            zoom: 12
        });
        
        // إضافة علامات للمطاعم
        const restaurants = [
            {
                name: "مطعم الوجبات الصحية",
                location: [46.6853, 24.7236],
                meal: "ساندويش دجاج مشوي"
            },
            {
                name: "بيتزا إيطاليا",
                location: [46.6653, 24.7036],
                meal: "بيتزا خضار"
            },
            {
                name: "مطعم اليابان",
                location: [46.6953, 24.6936],
                meal: "سوشي متنوع"
            },
            {
                name: "برجر تاون",
                location: [46.6753, 24.7336],
                meal: "برجر لحم"
            }
        ];
        
        restaurants.forEach(restaurant => {
            new mapboxgl.Marker()
                .setLngLat(restaurant.location)
                .setPopup(new mapboxgl.Popup().setHTML(`
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.meal}</p>
                    <button onclick="openOrderModalFromMap('${restaurant.meal}')" style="background: var(--primary); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                        احجز الآن
                    </button>
                `))
                .addTo(map);
        });
        
        // تهيئة خريطة التتبع
        const deliveryMap = new mapboxgl.Map({
            container: 'deliveryMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [46.6753, 24.7136],
            zoom: 13
        });
        
        // إضافة مسار التوصيل
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/46.6853,24.7236;46.6753,24.7136?geometries=geojson&access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
                const route = data.routes[0].geometry;
                
                deliveryMap.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route
                        }
                    },
                    paint: {
                        'line-color': '#3b82f6',
                        'line-width': 4
                    }
                });
                
                // إضافة علامات للمطعم والعميل
                new mapboxgl.Marker({ color: '#ef4444' })
                    .setLngLat([46.6853, 24.7236])
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>المطعم</h3>'))
                    .addTo(deliveryMap);
                
                new mapboxgl.Marker({ color: '#10b981' })
                    .setLngLat([46.6753, 24.7136])
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>موقعك</h3>'))
                    .addTo(deliveryMap);
                
                // محاكاة حركة المندوب
                const driverMarker = new mapboxgl.Marker({ color: '#3b82f6' })
                    .setLngLat([46.6853, 24.7236])
                    .addTo(deliveryMap);
                
                const coordinates = route.coordinates;
                let i = 0;
                
                const moveDriver = () => {
                    if (i < coordinates.length) {
                        driverMarker.setLngLat(coordinates[i]);
                        i++;
                        setTimeout(moveDriver, 100);
                    }
                };
                
                setTimeout(moveDriver, 1000);
            });
        
        // وظائف النماذج المنبثقة
        function openOrderModal(mealId) {
            // في الواقع، هذه البيانات ستأتي من قاعدة البيانات
            const meals = {
                1: {
                    name: "ساندويش دجاج مشوي",
                    restaurant: "مطعم الوجبات الصحية",
                    originalPrice: "35 ريال",
                    discountPrice: "20 ريال",
                    time: "18:00 - 19:30",
                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                },
                2: {
                    name: "بيتزا خضار",
                    restaurant: "بيتزا إيطاليا",
                    originalPrice: "45 ريال",
                    discountPrice: "25 ريال",
                    time: "19:00 - 20:30",
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80"
                },
                3: {
                    name: "سوشي متنوع",
                    restaurant: "مطعم اليابان",
                    originalPrice: "60 ريال",
                    discountPrice: "35 ريال",
                    time: "17:30 - 19:00",
                    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
                },
                4: {
                    name: "برجر لحم",
                    restaurant: "برجر تاون",
                    originalPrice: "30 ريال",
                    discountPrice: "18 ريال",
                    time: "18:30 - 20:00",
                    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80"
                }
            };
            
            const meal = meals[mealId];
            
            document.getElementById('modalMealName').textContent = meal.name;
            document.getElementById('modalMealRestaurant').textContent = meal.restaurant;
            document.getElementById('modalMealOriginalPrice').textContent = meal.originalPrice;
            document.getElementById('modalMealDiscountPrice').textContent = meal.discountPrice;
            document.getElementById('pickupTime').textContent = meal.time;
            document.getElementById('modalMealImg').src = meal.image;
            
            document.getElementById('orderModal').style.display = 'block';
        }
        
        function openOrderModalFromMap(mealName) {
            // يمكنك تنفيذ وظيفة مشابهة لـ openOrderModal
            alert(`سيتم فتح نموذج الحجز لـ ${mealName}`);
        }
        
        function closeModal() {
            document.getElementById('orderModal').style.display = 'none';
        }
        
        function openTrackingModal() {
            document.getElementById('trackingModal').style.display = 'block';
        }
        
        function closeTrackingModal() {
            document.getElementById('trackingModal').style.display = 'none';
        }
        
        function openRatingModal() {
            document.getElementById('ratingModal').style.display = 'block';
        }
        
        function closeRatingModal() {
            document.getElementById('ratingModal').style.display = 'none';
        }
        
        // وظائف الدفع
        function selectPaymentMethod(method) {
            document.querySelectorAll('.payment-method').forEach(el => {
                el.classList.remove('selected');
            });
            
            event.currentTarget.classList.add('selected');
            document.getElementById('paymentMethod').value = method;
            
            if (method === 'card') {
                document.getElementById('cardPaymentSection').style.display = 'block';
                document.getElementById('cashPaymentSection').style.display = 'none';
            } else {
                document.getElementById('cardPaymentSection').style.display = 'none';
                document.getElementById('cashPaymentSection').style.display = 'block';
            }
        }
        
        // وظيفة التقييم
        function rate(value) {
            document.getElementById('ratingValue').value = value;
            
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index < value) {
                    star.innerHTML = '<i class="fas fa-star"></i>';
                    star.style.color = '#FFD700';
                } else {
                    star.innerHTML = '<i class="far fa-star"></i>';
                    star.style.color = '#ddd';
                }
            });
        }
        
        // إرسال النماذج
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const paymentMethod = document.getElementById('paymentMethod').value;
            if (!paymentMethod) {
                alert('الرجاء اختيار طريقة الدفع');
                return;
            }
            
            // في الواقع، هنا سيتم إرسال البيانات إلى الخادم
            alert(`تم تقديم الطلب بنجاح! طريقة الدفع: ${paymentMethod === 'card' ? 'بطاقة ائتمان' : 'نقدًا عند الاستلام'}`);
            
            closeModal();
            openTrackingModal();
            
            // إرسال إشعار بالبريد الإلكتروني
            sendEmailNotification(
                document.getElementById('email').value,
                'تم تأكيد طلبك',
                `شكراً لطلبك من طعام بخصم! رقم طلبك هو #12345. يمكنك تتبع حالة الطلب من خلال حسابك.`
            );
        });
        
        document.getElementById('ratingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = document.getElementById('ratingValue').value;
            if (rating === '0') {
                alert('الرجاء اختيار تقييم');
                return;
            }
            
            // في الواقع، هنا سيتم إرسال التقييم إلى الخادم
            alert(`شكراً لتقييمك! تم تسجيل ${rating} نجوم`);
            
            closeRatingModal();
            
            // منح نقاط ولاء
            grantLoyaltyPoints(50);
        });
        
        // وظائف مساعدة
        function sendEmailNotification(email, subject, message) {
            // في الواقع، هنا سيتم إرسال البريد الإلكتروني باستخدام خدمة مثل SendGrid
            console.log(`إرسال بريد إلى: ${email}`);
            console.log(`الموضوع: ${subject}`);
            console.log(`المحتوى: ${message}`);
        }
        
        function grantLoyaltyPoints(points) {
            // في الواقع، هنا سيتم تحديث نقاط الولاء في قاعدة البيانات
            console.log(`تم منح ${points} نقطة ولاء`);
        }
        
        // محاكاة إشعارات push
        function showPushNotification(title, message) {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(title, { body: message });
            } else if ('Notification' in window && Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification(title, { body: message });
                    }
                });
            }
        }
        
        // طلب إذن الإشعارات عند تحميل الصفحة
        if ('Notification' in window) {
            Notification.requestPermission();
        }
        
        // عرض إشعار push بعد 5 ثواني (للتجربة)
        setTimeout(() => {
            showPushNotification('عروض جديدة متاحة!', 'اكتشف الوجبات المضافة حديثاً في منطقتك');
        }, 5000);
    </script>
</body>
</html>

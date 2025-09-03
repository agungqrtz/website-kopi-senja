// Menunggu seluruh dokumen HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // KODE UNTUK INTERAKTIVITAS MENU MODAL
    // =================================================================
// =================================================================
    // KODE BARU UNTUK TOMBOL "LIHAT SELENGKAPNYA"
    // =================================================================
    
    const readMoreBtn = document.getElementById('read-more-btn');
    const dots = document.getElementById('dots');
    const moreText = document.getElementById('more-text');

    // Pastikan elemen-elemennya ada sebelum menambahkan event listener
    if (readMoreBtn && dots && moreText) {
        readMoreBtn.addEventListener('click', () => {
            // Jika teks sedang tersembunyi
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                readMoreBtn.innerHTML = "Lihat Selengkapnya";
                moreText.style.display = "none";
            } else { // Jika teks sedang ditampilkan
                dots.style.display = "none";
                readMoreBtn.innerHTML = "Lihat Lebih Sedikit";
                moreText.style.display = "inline";
            }
        });
    }

    const menuData = {
        "Coffee Series": [
            { name: "Hot Latte", description: "Satu shot espresso dengan susu steam dan berlapis foam tipis di atasnya tanpa gula.", price: "Rp20.000", image: "images/hotlatte.png" },
            { name: "Iced Americano", description: "Espresso klasik yang disajikan dingin dengan air, memberikan rasa kopi yang kuat dan menyegarkan.", price: "Rp18.000", image: "images/americano.png" },
            { name: "Caramel Macchiato", description: "Perpaduan lembut susu steam, sirup vanila, espresso, dan saus karamel di atasnya.", price: "Rp25.000", image: "images/caramel.png" }
        ],
        "Frappe Series": [
            { name: "Choco Frappe", description: "Minuman kopi beku yang kaya rasa cokelat, di-blend halus dengan es dan susu.", price: "Rp28.000", image: "images/frape.png" },
            { name: "Matcha Frappe", description: "Kombinasi unik dari bubuk matcha premium, susu, dan es yang di-blend sempurna.", price: "Rp30.000", image: "images/matcha.png" }
        ],
        "Milk Series": [
            { name: "Belgian Chocolate", description: "Cokelat belgia premium yang disajikan panas atau dingin dengan susu segar.", price: "Rp24.000", image: "images/menu3.png" }
        ],
        // Anda bisa menambahkan kategori lain dari HTML Anda di sini
        "Kopi Baper Series": [
            { name: "Kopi Kenangan Mantan", description: "Kopi hitam pahit yang mengingatkan pada kenangan.", price: "Rp21.000", image: "images/menu4.png"}
        ],
        "Milik Indonesia Series": [
            { name: "Kopi Gula Aren", description: "Kopi susu dengan manisnya gula aren asli Indonesia.", price: "Rp22.000", image: "images/menu5.png" }
        ],
        "Tea Series": [
            { name: "Lychee Iced Tea", description: "Teh hitam manis yang menyegarkan dengan tambahan buah leci asli dan sirup leci.", price: "Rp22.000", image: "images/menu6.png" },
            { name: "Lemon Tea", description: "Teh klasik dengan perasan lemon segar, cocok dinikmati kapan saja.", price: "Rp18.000", image: "images/lemontea.png" }
        ],
        "Merchandise": [
            { name: "Kopi Senja Tumbler", description: "Bawa minuman favoritmu ke mana saja dengan tumbler eksklusif Kopi Senja.", price: "Rp150.000", image: "images/marchadese.png" }
        ]
    };

    let currentCategory = "Coffee Series";
    let currentIndex = 0;

    const modal = document.querySelector('#menuModal');
    // Pastikan modal ada sebelum menjalankan kode di dalamnya
    if (modal) {
        const categoryLinks = modal.querySelectorAll('.menu-sidebar nav li');
        const productImage = modal.querySelector('.product-image img');
        const productCategoryText = modal.querySelector('.product-category');
        const productNameText = modal.querySelector('.product-name');
        const productDescriptionText = modal.querySelector('.product-description');
        const productPriceText = modal.querySelector('.product-price');
        const prevArrow = modal.querySelector('.prev-arrow');
        const nextArrow = modal.querySelector('.next-arrow');
        const dotsContainer = modal.querySelector('.carousel-dots');

        function updateProductDisplay() {
            const products = menuData[currentCategory];
            if (!products || products.length === 0) return;

            const product = products[currentIndex];

            productCategoryText.textContent = currentCategory;
            productNameText.textContent = product.name;
            productDescriptionText.textContent = product.description;
            productPriceText.textContent = product.price;
            productImage.src = product.image;
            productImage.alt = product.name;
            
            updateDots();
        }
        
        function updateDots() {
            const products = menuData[currentCategory];
            dotsContainer.innerHTML = ''; 

            if (!products || products.length <= 1) {
                dotsContainer.style.display = 'none';
            } else {
                dotsContainer.style.display = 'flex';
                products.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.dataset.index = index;
                    dotsContainer.appendChild(dot);
                });
            }
            
            const arrowVisibility = products && products.length > 1 ? 'block' : 'none';
            prevArrow.style.display = arrowVisibility;
            nextArrow.style.display = arrowVisibility;
        }

        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                
                // Ambil nama kategori dari teks di dalam span
                const categoryName = link.querySelector('span') ? link.querySelector('span').textContent.trim() : '';

                // Cek apakah kategori ada di data sebelum diupdate
                if (menuData[categoryName]) {
                    currentCategory = categoryName;
                    currentIndex = 0;
                    updateProductDisplay();
                }
            });
        });

        nextArrow.addEventListener('click', () => {
            const products = menuData[currentCategory];
            currentIndex = (currentIndex + 1) % products.length;
            updateProductDisplay();
        });

        prevArrow.addEventListener('click', () => {
            const products = menuData[currentCategory];
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            updateProductDisplay();
        });
        
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                currentIndex = parseInt(e.target.dataset.index, 10);
                updateProductDisplay();
            }
        });

        // Inisialisasi tampilan modal saat pertama kali dimuat
        updateProductDisplay();
    }


    // =================================================================
    // KODE YANG SUDAH ADA SEBELUMNYA
    // =================================================================

    // Smooth Scrolling untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cek jika link bukan untuk toggle (seperti modal)
            if (!this.dataset.bsToggle) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efek navbar menjadi solid saat di-scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark');
        } else {
            navbar.classList.remove('bg-dark');
        }
    });

    // Efek animasi sederhana saat elemen muncul di layar (opsional)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animation');
            }
        });
    }, {
        threshold: 0.1 // Atur kapan animasi terpicu
    });

    const elementsToAnimate = document.querySelectorAll('section');
    elementsToAnimate.forEach((el) => observer.observe(el));

});
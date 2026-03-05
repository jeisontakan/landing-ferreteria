// CONFIGURACIÓN
const CONFIG = {
    whatsapp: {
        number: '573225880349',
        message: encodeURIComponent('¡Hola! Estoy interesado en materiales de construcción. ¿Podrían ayudarme con una cotización?')
    },
    business: {
        name: 'Ferretería Panamericana',
        phone: '+573225880349',
        email: 'ventas@ferreteriapanamericana.co',
        address: 'Calle 10 # 5-23, Centro, Ipiales'
    }
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ferretería Panamericana - Cargado correctamente');
    
    // Inicializar componentes
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initGallery();
    initAnimations();
    updateContactLinks();
    
    // Añadir clase cuando JS está cargado
    document.body.classList.add('js-loaded');
});

// MENÚ MÓVIL
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!toggleBtn || !navMenu) return;
    
    // Alternar menú
    toggleBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// SCROLL SUAVE
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FORMULARIO DE CONTACTO
function initContactForm() {
    const form = document.getElementById('cotizacionForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            nombre: this.querySelector('input[type="text"]').value,
            telefono: this.querySelector('input[type="tel"]').value,
            email: this.querySelector('input[type="email"]').value,
            mensaje: this.querySelector('textarea').value
        };
        
        // Validar campos requeridos
        if (!formData.nombre || !formData.telefono) {
            showNotification('Por favor, completa los campos requeridos', 'error');
            return;
        }
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = encodeURIComponent(
            `*Nueva Solicitud de Cotización*\n\n` +
            `*Nombre:* ${formData.nombre}\n` +
            `*Teléfono:* ${formData.telefono}\n` +
            `*Email:* ${formData.email || 'No proporcionado'}\n` +
            `*Mensaje:* ${formData.mensaje}\n\n` +
            `_Enviado desde el sitio web_`
        );
        
        // Abrir WhatsApp con el mensaje
        const whatsappURL = `https://wa.me/${CONFIG.whatsapp.number}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Mostrar confirmación
        showNotification('¡Solicitud enviada! Te contactaremos pronto por WhatsApp.', 'success');
        
        // Limpiar formulario
        form.reset();
    });
}

// GALERÍA INTERACTIVA
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
}

function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="Imagen ampliada">
            <button class="lightbox-close" aria-label="Cerrar">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Cerrar lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(this);
            document.body.style.overflow = '';
        }
    });
    
    // Estilos para el lightbox
    const styles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 5px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// ANIMACIONES AL SCROLL
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.product-card, .service-card, .contact-method, .feature-item'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ACTUALIZAR ENLACES DE CONTACTO
function updateContactLinks() {
    // WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsapp.number}?text=${CONFIG.whatsapp.message}`;
    });
    
    // Teléfono
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${CONFIG.business.phone}`;
        // Actualizar texto visible si contiene número de placeholder
        if (link.textContent.includes('(300)')) {
            link.textContent = link.textContent.replace('(300) 123-4567', '(322) 588-0349');
        }
    });
    
    // Email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        if (link.href.includes('ventas@')) {
            link.href = `mailto:${CONFIG.business.email}`;
        }
    });
}

// NOTIFICACIONES
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Asegurarse de que no haya notificaciones duplicadas
    document.querySelectorAll('.notification').forEach(el => el.remove());
    
    document.body.appendChild(notification);
    
    // Estilos para la notificación
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        }
        
        .notification-success {
            background: var(--success);
        }
        
        .notification-error {
            background: var(--error);
        }
        
        .notification-info {
            background: var(--info);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Solo añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// MANEJO DE ERRORES
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});

// OPTIMIZACIÓN DE IMÁGENES
function lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback con Intersection Observer
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// INICIALIZAR COMPONENTES ADICIONALES
function initAdditionalFeatures() {
    lazyLoadImages();
}

// EJECUTAR CARGA COMPLETA
window.addEventListener('load', function() {
    initAdditionalFeatures();
    console.log('✅ Todos los componentes cargados correctamente');
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cotizacionesForm');
    const editarBtn = document.getElementById('editarBtn');
    const imprimirBtn = document.getElementById('imprimirBtn');

    function cargarDatosGuardados() {
        const campos = ['dolarCompra', 'dolarVenta', 'euroCompra', 'euroVenta', 
                        'realCompra', 'realVenta', 'argentinoCompra', 'argentinoVenta'];
        
        campos.forEach(campo => {
            const valor = localStorage.getItem(campo);
            if (valor) {
                const elemento = document.getElementById(campo);
                if (elemento) {
                    elemento.value = valor;
                }
            }
        });
    }

    if (window.location.pathname.endsWith('form.html')) {
        cargarDatosGuardados();
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            guardarYAbrirDisplay();
        });
    }

    if (editarBtn) {
        editarBtn.addEventListener('click', function() {
            actualizarDisplay();
            mostrarModal("Cambio de pizarra realizado correctamente");
        });
    }

    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', function() {
            if (window.displayWindow && !window.displayWindow.closed) {
                imprimirCotizaciones();
            } else {
                alert('Por favor, abra primero la ventana de visualización.');
            }
        });
    }

    function guardarYAbrirDisplay() {
        guardarDatos();
        if (!window.displayWindow || window.displayWindow.closed) {
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            window.displayWindow = window.open('display.html', 'DisplayWindow', `width=${screenWidth},height=${screenHeight},left=0,top=0`);
            
            if (window.displayWindow) {
                window.displayWindow.moveTo(0, 0);
                window.displayWindow.resizeTo(screenWidth, screenHeight);
            }
        } else {
            window.displayWindow.focus();
        }
        
        setTimeout(() => {
            if (window.displayWindow) {
                window.displayWindow.postMessage('requestFullscreen', '*');
            }
        }, 1000);
    }

    function actualizarDisplay() {
        guardarDatos();
    }

    function guardarDatos() {
        const campos = ['dolarCompra', 'dolarVenta', 'euroCompra', 'euroVenta', 
                        'realCompra', 'realVenta', 'argentinoCompra', 'argentinoVenta'];
        
        campos.forEach(campo => {
            const valor = document.getElementById(campo).value;
            localStorage.setItem(campo, valor);
        });

        localStorage.setItem('ultimaActualizacion', new Date().getTime());
    }

    function imprimirCotizaciones() {
        const contenidoImprimir = `
            <html>
            <head>
                <title>Cotizaciones</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { text-align: center; }
                    .cotizacion { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>Cotizaciones</h1>
                <div class="cotizacion">
                    <h2>Dólar:</h2>
                    <p>Compra: ${localStorage.getItem('dolarCompra')} - Venta: ${localStorage.getItem('dolarVenta')}</p>
                </div>
                <div class="cotizacion">
                    <h2>Euro:</h2>
                    <p>Compra: ${localStorage.getItem('euroCompra')} - Venta: ${localStorage.getItem('euroVenta')}</p>
                </div>
                <div class="cotizacion">
                    <h2>Real:</h2>
                    <p>Compra: ${localStorage.getItem('realCompra')} - Venta: ${localStorage.getItem('realVenta')}</p>
                </div>
                <div class="cotizacion">
                    <h2>Peso Argentino:</h2>
                    <p>Compra: ${localStorage.getItem('argentinoCompra')} - Venta: ${localStorage.getItem('argentinoVenta')}</p>
                </div>
                <footer style="font-style:italic; color:yellow;"><h6>desarrollo-JBentos</h6></footer>
            </body>
            </html>
        `;

        const ventanaImprimir = window.open('', '_blank');
        ventanaImprimir.document.write(contenidoImprimir);
        ventanaImprimir.document.close();
        ventanaImprimir.print();
        ventanaImprimir.close();
    }

    function mostrarModal(mensaje) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'rgba(0, 255, 255, 0.8)';
        modal.style.color = 'black';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.zIndex = '1000';
        modal.textContent = mensaje;

        document.body.appendChild(modal);

        setTimeout(() => {
            document.body.removeChild(modal);
        }, 4000);
    }

    if (window.location.pathname.endsWith('display.html')) {
        actualizarCotizaciones();

        const cotizacionesSection = document.querySelector('.cotizaciones-section');
        const sliderSection = document.querySelector('.slider-section');
        const slides = document.querySelectorAll('.slide');
        const logoVarlix = document.querySelector('.logovarlix');
        const titulo = document.querySelector('.titulo');
        let currentSlide = -1;
        let isTransitioning = false;

        function animateLogo() {
            logoVarlix.style.transition = 'none';
            logoVarlix.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                logoVarlix.style.transition = 'transform 1s ease-out';
                logoVarlix.style.transform = 'translateX(0)';
            }, 50);
        }

        function animateTitulo() {
            titulo.style.transition = 'none';
            titulo.style.transform = 'translateX(100%)';
            setTimeout(() => {
                titulo.style.transition = 'transform 2s ease-out';
                titulo.style.transform = 'translateX(0)';
            }, 50);
        }

        function fadeInElements() {
            const elementsColor = document.querySelectorAll('.color');
            const elementsColor1 = document.querySelectorAll('.color1');

            animateLogo();
            animateTitulo();

            elementsColor.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in');
                    el.classList.remove('fade-out');
                }, index * 500);
            });

            elementsColor1.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in');
                    el.classList.remove('fade-out');
                }, (index * 500) + 250);
            });
        }

        function fadeOutElements() {
            const elementsColor = document.querySelectorAll('.color');
            const elementsColor1 = document.querySelectorAll('.color1');

            elementsColor.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-out');
                    el.classList.remove('fade-in');
                }, index * 500);
            });

            elementsColor1.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-out');
                    el.classList.remove('fade-in');
                }, (index * 500) + 250);
            });
        }

        function showNextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;

            if (cotizacionesSection.classList.contains('active')) {
                fadeOutElements();
                setTimeout(() => {
                    cotizacionesSection.classList.remove('active');
                    sliderSection.classList.add('active');
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides.forEach((slide, index) => {
                        if (index === currentSlide) {
                            slide.style.display = 'block';
                        } else {
                            slide.style.display = 'none';
                        }
                    });
                    isTransitioning = false;
                }, 2000);
            } else {
                sliderSection.classList.remove('active');
                cotizacionesSection.classList.add('active');
                fadeInElements();
                setTimeout(() => {
                    isTransitioning = false;
                }, 2000);
            }
        }

        setInterval(showNextSlide, 10000);

        cotizacionesSection.classList.add('active');
        fadeInElements();

        function requestFullScreen() {
            var elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }

        requestFullScreen();

        window.addEventListener('storage', function(e) {
            if (e.key === 'ultimaActualizacion') {
                actualizarCotizaciones();
            }
        });
    }

    function actualizarCotizaciones() {
        const dolarCompra = localStorage.getItem('dolarCompra') || '';
        const dolarVenta = localStorage.getItem('dolarVenta') || '';
        const euroCompra = localStorage.getItem('euroCompra') || '';
        const euroVenta = localStorage.getItem('euroVenta') || '';
        const realCompra = localStorage.getItem('realCompra') || '';
        const realVenta = localStorage.getItem('realVenta') || '';
        const argentinoCompra = localStorage.getItem('argentinoCompra') || '';
        const argentinoVenta = localStorage.getItem('argentinoVenta') || '';

        const dolarElement = document.querySelector('#dolar .cotizacion');
        const euroElement = document.querySelector('#euro .cotizacion');
        const realElement = document.querySelector('#real .cotizacion');
        const argentinoElement = document.querySelector('#argentino .cotizacion');

        if (dolarElement) dolarElement.innerHTML = `<span class="numero">${dolarCompra}</span><span class="numero">        ─         </span><span class="numero">${dolarVenta}</span>`;
        if (euroElement) euroElement.innerHTML = `<span class="numero">${euroCompra}</span><span class="numero">        ─         </span><span class="numero">${euroVenta}</span>`;
        if (realElement) realElement.innerHTML = `<span class="numero">${realCompra}</span><span class="numero">         ─         </span><span class="numero">${realVenta}</span>`;
        if (argentinoElement) argentinoElement.innerHTML = `<span class="numero">${argentinoCompra}</span><span class="numero">         ─         </span><span class="numero">${argentinoVenta}</span>`;
    }
});

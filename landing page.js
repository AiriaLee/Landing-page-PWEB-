function showMessage(message, type = 'success') {
    const container = document.getElementById('message-container');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        const bsToast = bootstrap.Toast.getInstance(toast) || new bootstrap.Toast(toast);
        bsToast.hide();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }, 5000);
}

function initializeAnimationsAndFeatures() {
    const logoElement = document.getElementById('bago-farm-logo');
    const textToAnimate = "BAGO FARM";
    const letters = textToAnimate.split('');
    const delayBetweenLetters = 150; 

    logoElement.innerHTML = letters.map(letter => {
        if (letter === ' ') return '&nbsp;'; 
        return `<span class="logo-letter">${letter}</span>`;
    }).join('');

    const letterSpans = logoElement.querySelectorAll('.logo-letter');
    letterSpans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = '1';
        }, index * delayBetweenLetters);
    });


    const welcomeTextContainer = document.getElementById('welcome-text-container');
    const textToType = " Untuk Kualitas Terbaik."; 
    let i = 0;
    const speed = 75; 

    setTimeout(() => {
        function typeWriter() {
          if (i < textToType.length) {
            welcomeTextContainer.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        typeWriter();
    }, textToAnimate.length * delayBetweenLetters + 500);

    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('main-navbar');
        // Gunakan jQuery untuk mengubah background color
        if (window.scrollY > 50) {
            $(navbar).css('background-color', 'var(--dark-color)'); 
        } else {
            $(navbar).css('background-color', 'rgba(33, 37, 41, 0.9)');
        }
    });
}

window.onload = initializeAnimationsAndFeatures;

$(document).ready(function() {
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70 
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { 
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); 
                        $target.focus();
                    };
                });
                
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
    
    $('#contact-form').on('submit', function(event) {
        event.preventDefault(); 
        
        const form = this;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            $(form).addClass('was-validated'); 
            showMessage("Mohon lengkapi semua kolom formulir yang wajib diisi.", "danger");
            return;
        }

        const name = $('#name').val();
        
        console.log("Simulating form submission...");
        
        showMessage(`Terima kasih, ${name}! Pesan Anda berhasil dikirim (simulasi). Kami akan segera menghubungi Anda.`, "success");
        
        form.reset();
        $(form).removeClass('was-validated'); 
    });
});

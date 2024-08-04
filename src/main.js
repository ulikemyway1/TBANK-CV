document.addEventListener('DOMContentLoaded', () => {
    const editableElements = document.querySelectorAll([
        '[contenteditable="plaintext-only"]',
    ]);

    editableElements.forEach((element, index) => {
        element.setAttribute('contenteditable', 'true');

        const savedContent = localStorage.getItem(
            `AP_editableContent-${index}`
        );
        if (savedContent) {
            element.textContent = savedContent;
        }

        element.addEventListener('blur', function () {
            localStorage.setItem(
                `AP_editableContent-${index}`,
                element.textContent
            );
        });
    });

    document
        .getElementById('download-pdf')
        .addEventListener('click', function () {
            const pdfContent = document.querySelector('main');
            const pdfName = document.querySelector('.my-name')?.textContent;
            html2pdf()
                .from(pdfContent)
                .set({
                    margin: 0,
                    filename: `${pdfName || 'user'} CV`,
                    jsPDF: {
                        orientation: 'portrait',
                    },
                    pagebreak: { before: '.education', avoid: 'img' },
                })
                .save();
        });

    const waveElements = document.querySelectorAll(
        'div:has([contenteditable]), .button, .img-wrapper'
    );

    waveElements.forEach((element) => {
        element.addEventListener('click', function (e) {
            e.stopPropagation();
            const wave = document.createElement('div');
            wave.className = 'wave-effect';
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            wave.style.width = wave.style.height = `${size}px`;
            wave.style.left = `${e.clientX - rect.left - size / 2}px`;
            wave.style.top = `${e.clientY - rect.top - size / 2}px`;

            element.appendChild(wave);

            wave.addEventListener('animationend', function () {
                wave.remove();
            });
        });
    });
});

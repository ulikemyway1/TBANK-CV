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
});

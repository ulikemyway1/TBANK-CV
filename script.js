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
});

export function updateActiveState(element, selector, activeClass = 'active') {
    if (!element || !selector) {
        console.error('Invalid arguments passed to updateActiveState');
        return;
    }
    document.querySelectorAll(selector).forEach(item => {
        item.classList.remove(activeClass);
    });
    element.classList.add(activeClass);
}

export function initializeTabButtons() {
    const buttons = document.querySelectorAll('.tab-button');
    if (!buttons.length) {
        console.error('No tab buttons found');
        return;
    }
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            updateActiveState(button, '.tab-button');
            const tabId = button.getAttribute('data-tab');
            const tabElement = document.getElementById(tabId);
            if (tabElement) {
                tabElement.classList.add('active');
            } else {
                console.error(`Tab element with id ${tabId} not found`);
            }
        });
    });
}
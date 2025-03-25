const Toast = {
 show: function(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-4 right-4 z-50 max-w-max space-y-2';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const toastId = `toast-${Date.now()}`;
    toast.id = toastId;

    const config = {
        success: {
            bgColor: 'bg-green-100 border-green-500',
            textColor: 'text-green-800',
            icon: `
                <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
        },
        error: {
            bgColor: 'bg-red-100 border-red-500',
            textColor: 'text-red-800',
            icon: `
                <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
        }
    };

    const { bgColor, textColor, icon } = config[type];

    toast.innerHTML = `
        <div class="p-4 rounded-lg shadow-lg border-l-4 ${bgColor} ${textColor}
            flex items-center justify-between
            transform transition-all duration-300 ease-in-out
            translate-x-full opacity-0">
            <div class="flex items-center">
                ${icon}
                <span class="font-medium text-sm">${message}</span>
            </div>
            <button class="close-toast ml-4 hover:bg-gray-200 rounded-full p-1 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

    container.appendChild(toast);

    const toastInner = toast.querySelector('div');
    requestAnimationFrame(() => {
        toastInner.classList.remove('translate-x-full', 'opacity-0');
    });

    const closeButton = toast.querySelector('.close-toast');
    closeButton.addEventListener('click', () => {
        this.remove(toast);
    });

    setTimeout(() => {
        this.remove(toast);
    }, 3000);
 },

 remove: function(toastElement) {
    const toastInner = toastElement.querySelector('div');
    toastInner.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
        toastElement.remove();
    }, 300);
 }
};

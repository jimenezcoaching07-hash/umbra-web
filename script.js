document.addEventListener('DOMContentLoaded', () => {
    const promoBar = document.getElementById('promoBar');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const actionPromoBtn = document.getElementById('actionPromoBtn');

    if (promoBar) {
        if (closePromoBtn) {
            closePromoBtn.addEventListener('click', () => {
                promoBar.style.display = 'none';
            });
        }
        
        if (actionPromoBtn) {
            actionPromoBtn.addEventListener('click', () => {
                promoBar.style.display = 'none';
            });
        }
    }
});

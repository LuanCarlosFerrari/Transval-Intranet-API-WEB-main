export function initContactSection() {
    return `
        <div class="titulo-container">
            <h2>Central de Atendimento</h2>
                <div class="contacts-grid">
                    <div class="contact-item">
                        <i class="fas fa-building"></i>
                        <h3>Matriz - Rinópolis</h3>
                        <p>Tel: (18) 3583-1016</p>
                        <p>Email: matriz@transval.net.br</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-warehouse"></i>
                        <h3>Filial - Rondonópolis</h3>
                        <p>Tel: (66) 3424-0027</p>
                        <p>Email: rondonopolis@transval.net.br</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-industry"></i>
                        <h3>Filial - Sumaré</h3>
                        <p>Tel: (19) 3112-2078</p>
                        <p>Email: sumare@transval.net.br</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-headset"></i>
                        <h3>SAC</h3>
                        <p>Tel: 0800-123-4567</p>
                        <p>Email: sac@transval.net.br</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-users-cog"></i>
                        <h3>Recursos Humanos</h3>
                        <p>Tel: (18) 3583-1016</p>
                        <p>Email: rh@transval.net.br</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-truck-loading"></i>
                        <h3>Operacional</h3>
                        <p>Tel: (18) 3583-1016</p>
                        <p>Email: operacional@transval.net.br</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Se necessário, você pode adicionar eventos específicos aqui
export function initContactEvents() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            // Adicione aqui qualquer interatividade necessária
        });
    });
}
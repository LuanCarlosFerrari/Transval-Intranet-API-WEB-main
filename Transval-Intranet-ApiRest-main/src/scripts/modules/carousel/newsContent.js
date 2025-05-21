export function updateNewsContent() {
    const newsContents = [
        "WL Scania: Excelência em Transporte - Parceria Transval",
        "Demonstração das Operações de Transporte - Transval",
        "Qualidade e Eficiência no Transporte de Cargas",
        "Compromisso com a Excelência em Logística"
    ];
    const currentNewsSpan = document.querySelector('.current-news');
    document.querySelector('.news-content').textContent = newsContents[currentSlide];
    if (currentNewsSpan) {
        currentNewsSpan.textContent = currentSlide + 1;
    }
}
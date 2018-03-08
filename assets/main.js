class TemplateParserJson {
    static parse(template) {
        let struct = JSON.parse(template);
        let elements = struct.map((e) => {
            let element = Object.assign({
                title: "",
                titleColor: '',
                image: "",
                description: "",
                size: "",
            }, e);
            if(!element.title.trim() || !element.size.trim()) {
                return '';
            }
            if(element.description.length > 255) {
                element.description = element.description.substr(0, 255 + element.description.substr(255).indexOf(' '));
            } else if (!element.description.trim()) {
                return `
                <div class="grid__card size_${ element.size }">
                    <h2 class="YSText-Bold" style="color: ${ element.titleColor };">${ element.title }</h2><div class="card__actions-wrapper">
                    ` + (element.image.trim() ? `
                    <img srcset="${ element.image.trim() ?
                    ['', '@2x', '@3x'].map(e=>element.image.replace(new RegExp(`\.(png|jpg|jpeg)`,'gi'), `${e}.$1 ${e.replace(/(@|x)/ig, '') * 320 || '320'}w`)) : ""
                    }" sizes="${ element.image.trim() ?
                    [1, 2, 3].map(e => `(max-width: ${e * 320 - 1}px) ${e * 320}px`) : ''
                    }" src="${ element.image }">
                    ` : '') + `
                    <div class="card__actions"><div class="more"></div><div class="like"></div></div></div>
                </div>
            `;
            }
            return `
                <div class="grid__card size_${ element.size }">
                    <h2 class="YSText-Bold" style="color: ${ element.titleColor };">${ element.title }</h2>
                    ` + (element.image.trim() ? `
                    <img srcset="${ element.image.trim() ?
                            ['', '@2x', '@3x'].map(e=>element.image.replace(new RegExp(`\.(png|jpg|jpeg)`,'gi'), `${e}.$1 ${e.replace(/(@|x)/ig, '') * 320 || '320'}w`)) : ""
                    }" sizes="${ element.image.trim() ?
                            [1, 2, 3].map(e => `(max-width: ${e * 320 - 1}px) ${e * 320}px`) : ''
                    }" src="${ element.image }">
                    ` : '') + `
                    <div class="description">${element.description}<div class="card__actions"><div class="more"></div><div class="like"></div></div></div>
                </div>
            `;
        });
        return elements.join("\n");
    }
}
document.onreadystatechange = function(e) {
    Array.from(document.querySelectorAll('template')).map(e => {
        e.outerHTML = TemplateParserJson.parse(e.innerHTML);
    });
};
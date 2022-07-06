window.addEventListener("load", function() {
    const termsToRemove = [
        'J(\\.)?(\\s)?K(\\.)?\\sRowling',
        'JK\\sRowling',
        'JKR',
        'J\\.K\\.R\\.',
        'Jo\\sRowling',
        'Joanne\\sRowling',
        'Rowling'
    ];

    let elements = [];

    const tagsToScan = [
        'span',
        'a',
        'p'
    ];

    let expression = '(' + termsToRemove.join('|') + ')';
    let replacementExpression = new RegExp(expression, 'i');

    for(let index = 0; index < tagsToScan.length; index++){
        elements = elements.concat(Array.from(document.getElementsByTagName(tagsToScan[index])));
    }

    for(let elementIndex = 0; elementIndex < elements.length; elementIndex++){
        if (elements[elementIndex] && elements[elementIndex].innerHTML && replacementExpression.test(elements[elementIndex].innerHTML) === true){
            elements[elementIndex].innerHTML = elements[elementIndex].innerHTML.replace(replacementExpression, '');
        }
    }

    console.info(`deJO scannned ${ elements.length } page elements for cleaning.`);

    let imgsRemoved = 0;
    let imgs = document.getElementsByTagName('img');
    for(let imgIndex = 0; imgIndex < imgs.length; imgIndex++){
       if(replacementExpression.test(imgs[imgIndex].alt) === true || replacementExpression.test(imgs[imgIndex].src) === true){
            imgs[imgIndex].style.visibility = 'hidden';
            imgsRemoved++;
       }
    }

    console.info(`deJO removed ${ imgsRemoved } images.`);

    let divsRemoved = 0;
    let divs = document.getElementsByTagName('div');
    for(let divIndex = 0; divIndex < divs.length; divIndex++){

       if(replacementExpression.test(divs[divIndex].text) === true){
            divs[divIndex].style.visibility = 'hidden';
            divsRemoved++;
       }

    }

    console.info(`deJO removed ${ divsRemoved } elements that couldn't be cleaned.`);
    console.info('deJO complete');
});
const initTOC = (selector, target, options) => {
    if (elcreativeConfig.options.optionFeatureTOC == '1px' || elcreativeConfig.options.optionFeatureTOC == '1px' && elcreativeConfig.options.optionFeaturePostSplit == '2px') return;

    const buttonFABTOC = document.getElementById('button_toc');
    let tocDefaultConfig = {
        levels: 'h2, h3, h4, h5, h6',
        listType: 'ol',
    };
    let tocTarget = document.querySelector(target);
    if (!tocTarget) return;

    let tocConfig = {};
    let tocHeading;

    const merge = (obj) => {
        for (let key in tocDefaultConfig) {
            if (Object.prototype.hasOwnProperty.call(tocDefaultConfig, key)) {
                tocConfig[key] = Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : tocDefaultConfig[key];
            }
        }
    };

    const createID = (heading) => {
        if (heading.id.length) return;
        heading.id = `elcreative_toc_${heading.textContent.toLowerCase().replace(/[^A-Za-z0-9]/g, '_')}`;
    };

    const getIndent = function (count) {
        let html = '';
        for (let index = 0; index < count; index++) {
            html += '<' + tocConfig.listType + '>';
        }

        return html;
    };

    const getOutdent = (count) => {
        let html = '';
        for (let index = 0; index < count; index++) {
            html += '</' + tocConfig.listType + '></li>';
        }

        return html;
    };

    const getStartingHTML = (diff, index) => {
        if (diff > 0) return getIndent(diff);
        if (diff < 0) return getOutdent(Math.abs(diff));
        if (index && !diff) return '</li>';

        return '';
    };

    merge(options || {});
    // If none are found, don't render a list
    tocHeading = selector.querySelectorAll(tocConfig.levels);
    if (!tocHeading.length) return buttonFABTOC.remove();

    let level = tocHeading[0].tagName.slice(1);
    let startingLevel = level;
    let len = tocHeading.length - 1;
    tocTarget.innerHTML = `<${tocConfig.listType}>` + Array.prototype.map.call(tocHeading, (heading, index) => {
        createID(heading);
        let currentLevel = heading.tagName.slice(1);
        let levelDifference = currentLevel - level;
        level = currentLevel;

        let html = getStartingHTML(levelDifference, index);
        html += `<li><a href='#${heading.id}' data-toggle-trigger-off>${heading.innerHTML.trim()}</a>`;
        if (index === len) html += getOutdent(Math.abs(startingLevel - currentLevel));

        return html;
    }).join('') + `</${tocConfig.listType}>`;

    // let tocObserver = new IntersectionObserver((tocEntries) => {
    //     tocEntries.forEach((entry) => {
    //         var id = entry.target.getAttribute('id');
    //         if (entry.intersectionRatio > 0) {
    //             document.querySelector(`li a[href="#${id}"]`).classList.add('font-bold');
    //         } else {
    //             document.querySelector(`li a[href="#${id}"]`).classList.remove('font-bold');
    //         }
    //     });
    // });
    // // Track all sections that have an `id` applied
    // document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((section) => {
    //     tocObserver.observe(section);
    // });


    const tocOl = document.getElementById('dialog_toc');
    if (tocOl) {
        if (tocOl.querySelector('.dialog_content').childNodes.length < 1) {
            buttonFABTOC.remove();
            tocOl.remove();
        };

        buttonFABTOC.addEventListener('toggleAfter', (event) => {
            if (window.easyToggleState.isActive(event.target)) {
                document.documentElement.classList.add('overflow-hidden');
            } else {
                document.documentElement.classList.remove('overflow-hidden');
            }
        });
    };
}

initTOC(elementPostBody, '.content_toc', {
    tocElementTarget: '.content_toc'
})
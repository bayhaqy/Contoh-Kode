const wikipedia = item => {
    const urls = `https://id.wikipedia.org/w/api.php?action=query&titles=${item}&prop=extracts&exintro&explaintext&exsentences=10&redirects&converttitles&format=json&callback=elcWikipedia`;

    elcWikipedia = (data) => {
        const articleID = Object.keys(data.query.pages)[0];

        if (data.query.pages[articleID].extract) {
            const intro = data.query.pages[articleID].extract.toString();
            const result = `<strong>${item}</strong><div class='text-justify text-sm'>${intro}</div>`

            document.getElementById('section_aside_widget').innerHTML = result
        }
    }

    functionLoadScript(urls)
}

const lists = document.querySelector('.mb-1.flex.h-7.flex-row.items-center.justify-center.text-sm.font-medium.text-colorIndexLabel.no-underline');
wikipedia(lists.innerText)
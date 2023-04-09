import { chatResponseGet } from './chatResponseGet';
import { chatScrollBottom } from './chatScrollBottom';

export const chatSend = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    const elementContainerAlt = options.elementContainer;
    const elementInput = document.querySelector(options.elementInput);
    const elementInputValue = elementInput.value;
    const minCharacter = options.config.minCharacter;
    const imageUser = options.config.imageUser;
    const imageBot = options.config.imageBot;
    const apiKey = options.config.apiKey;

    if (elementInputValue.length < minCharacter) {
        alert(`Silahkan masukkan pesan lebih dari ${minCharacter} karakter.`);

        return false;
    }

    if (elementInputValue === '') {
        alert('Silahkan masukkan pesan anda.');

        elementInput.focus();

        return false;
    }

    elementContainer.innerHTML += `<div class="question"><p>${elementInputValue}</p><img src="${imageUser}" loading="lazy"/></div>`;

    chatScrollBottom({
        elementContainer: elementContainerAlt,
    });

    chatResponseGet({
        elementContainer: elementContainerAlt,

        config: {
            apiKey: apiKey,
            messages: elementInputValue,
            imageBot: imageBot,
        },
    });

    let chatArray = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatArray.push({
        name: 'User',
        message: elementInputValue,
    });
    localStorage.setItem('chatHistory', JSON.stringify(chatArray));

    elementInput.value = '';
    elementInput.innerHTML = '';
};

import { chatScrollBottom } from './chatScrollBottom';

export const chatReponse = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    const elementContainerAlt = options.elementContainer;
    const imageBot = options.config.imageBot;

    let messages = options.config.messages;

    let chatArray = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatArray.push({
        name: 'Bot',
        message: messages,
    });

    messages = messages.trim();
    messages = messages.replace(new RegExp('\r?\n', 'g'), '<br />');
    messages = messages.replace(/User:|Bot:|User :|Bot :/g, '');

    elementContainer.innerHTML += `<div class="answer"><img src="${imageBot}" loading="lazy"/><p>${messages}</p></div>`;

    localStorage.setItem('chatHistory', JSON.stringify(chatArray));

    chatScrollBottom({
        elementContainer: elementContainerAlt,
    });
};

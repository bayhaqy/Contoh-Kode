import { chatScrollBottom } from './chatScrollBottom';
import { chatSend } from './chatSend';

const chatInit = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    const elementContainerAlt = options.elementContainer;

    const minCharacter = options.config.minCharacter;
    const imageUser = options.config.imageUser;
    const imageBot = options.config.imageBot;
    const apiKey = options.config.apiKey;

    if (elementContainer) {
        elementContainer.innerHTML = `
        <div class="elcreative-chat-container"></div>
        <div class="elcreative-chat-input-container">
            <textarea rows="1" placeholder="Masukkan pesan anda..."></textarea>
            <button type="button" aria-label="Kirim Pesan">
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                <span>Kirim Pesan</span>
            </button>
        </div>
        `;

        const chatStorage = JSON.parse(localStorage.getItem('chatHistory'));
        if (chatStorage && chatStorage.length > 0) {
            let datas = '';

            for (let index = 0; index < chatStorage.length; index++) {
                const data = chatStorage[index];

                datas += data.name === 'User' ? `<div class="question"><p>${data.message}</p><img src="${imageUser}" loading="lazy"/></div>` : `<div class="answer"><img src="${imageBot}" loading="lazy"/><p>${data.message}</p></div>`;
            }

            document.querySelector('.elcreative-chat-container').innerHTML = datas;

            chatScrollBottom({
                elementContainer: '.elcreative-chat-container',
            });
        }

        const buttonSend = elementContainer.querySelector('.elcreative-chat-input-container button');
        buttonSend.addEventListener('click', (event) => {
            event.preventDefault();

            chatSend({
                elementContainer: '.elcreative-chat-container',
                elementInput: '.elcreative-chat-input-container textarea',

                config: {
                    apiKey: apiKey,
                    minCharacter: minCharacter,
                    imageUser: imageUser,
                    imageBot: imageBot,
                },
            });
        });

        const inputChat = elementContainer.querySelector('.elcreative-chat-input-container textarea');
        inputChat.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 && !event.shiftKey) {
                chatSend({
                    elementContainer: '.elcreative-chat-container',
                    elementInput: '.elcreative-chat-input-container textarea',

                    config: {
                        apiKey: apiKey,
                        minCharacter: minCharacter,
                        imageUser: imageUser,
                        imageBot: imageBot,
                    },
                });

                return false;
            }
        });
    }
};

window.bloggerChatGPT = chatInit;

import { aesCrypto } from './aesCrypto';
import { chatReponse } from './chatReponse';

export const chatResponseGet = async (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    const elementContainerAlt = options.elementContainer;
    const messages = options.config.messages;
    const imageBot = options.config.imageBot;
    const apiKey = options.config.apiKey;

    let chatArray = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatArray.push({
        name: 'Bot',
        message: messages,
    });

    let messageConversation = '';
    chatArray.forEach((data) => {
        messageConversation += `${data.name}: ${data.message}`;
    });

    if (apiKey !== null) {
        const apis = aesCrypto.decrypt(decodeURI(apiKey).replace(/^\s+/, '').replace(/\s+$/, '') || 0, 'root');

        await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apis}`,
            },
            body: JSON.stringify({
                prompt: `The following is a conversation between ChatGPT: and User: \n\n ${messageConversation}`,
                max_tokens: 1500,
                temperature: 1,
                top_p: 0,
                n: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.choices && data.choices.length > 0 && data.choices[0].text) {
                    chatReponse({
                        elementContainer: elementContainerAlt,

                        config: {
                            messages: data.choices[0].text,
                            imageBot: imageBot,
                        },
                    });
                }
            });
    }
};

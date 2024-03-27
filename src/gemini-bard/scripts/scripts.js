import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const bloggerGemini = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    if (elementContainer) {
        elementContainer.innerHTML = `
            <div class="elcreative-chat-container"></div>
            <div class="elcreative-chat-input-container">
                <textarea rows="1" id="chat-textarea" placeholder="Masukkan perintah di sini"></textarea>
                <button type="button" aria-label="Kirim Pesan">
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                </button>
            </div>
        `;

        const inputContainer = elementContainer.querySelector('.elcreative-chat-input-container');
        const inputContainerTextarea = elementContainer.querySelector('.elcreative-chat-input-container textarea');
        const buttonSend = elementContainer.querySelector('.elcreative-chat-input-container button');
        const inputContainerChat = elementContainer.querySelector('.elcreative-chat-container');

        inputContainerTextarea.addEventListener('input', function () {
            this.style.height = 'auto';
            if (this.scrollHeight > parseInt(window.getComputedStyle(this).lineHeight) * 2) {
                this.style.height = `${this.scrollHeight}px`;
                inputContainer.classList.add('expand');
            } else {
                inputContainer.classList.remove('expand');
            }

            // Toggle button display style based on textarea value
            buttonSend.style.display = this.value.trim() !== '' ? 'inline-flex' : 'none';
        });

        buttonSend.addEventListener('click', async (event) => {
            event.preventDefault();

            const inputContainerTextareaValue = inputContainerTextarea.value;
            let message = inputContainerTextareaValue.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
            if (message === '') {
                buttonSend.style.display = 'none';
                return;
            } else {
                const generativeAI = new GoogleGenerativeAI(options.config.apiKey);
                const model = generativeAI.getGenerativeModel({
                    model: "gemini-pro"
                });
                const chat = model.startChat({
                    maxOutputTokens: 1000,
                    temperature: 0.9,
                });
                inputContainerChat.innerHTML += `<div class="question"><p>${message}</p><img src="${options.config.imageUser || 'https://lh3.googleusercontent.com/a/default-user=s56-c'}" loading="lazy"/></div>`;
                inputContainerTextarea.style.height = 'auto';
                buttonSend.style.display = 'none';
                inputContainerTextarea.value = '';

                const result = await chat.sendMessageStream(message);
                let rawText = '';
                for await (const chunk of result.stream) {
                    rawText += chunk.text();

                    void inputContainerChat.offsetHeight;
                }

                inputContainerChat.innerHTML += `<div class="answer"><img src="${options.config.imageBot || 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhz629E-i_ZxgUPCJDNbU1n7jBxT8eO9275F4ZUEEWE7JXdigT2Ns2vuoyR-xpCduXYALKvL9cpvJqhHapeFVK8YTySNa83SBYKzSjQxLRyfTH34KwQUNE9zZiJh4HAhq9OfPze2VydU1DbWxzuLcZ0upWvJ6kZrr0CANAxKmXGvxj_JGuu6njyvd8tgw/s60/ELC%20Cap%20Grey%201000px.png'}" loading="lazy"/><div class="content">${marked.parse(rawText)}</div></div>`;
            }
        });
    }
};

window.bloggerGemini = bloggerGemini;

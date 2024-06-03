import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const genAI = new GoogleGenerativeAI('AIzaSyCU0fGXeR-wR6PT2B23tCRUOc2sTcOzN-8');
let conversationHistory = '';

const adjustTextareaHeight = (textarea) => {
    const parentElement = textarea.parentElement;
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const numberOfLines = Math.ceil(textarea.scrollHeight / lineHeight);

    parentElement.classList.toggle('rounded-full', numberOfLines <= 1);
    parentElement.classList.toggle('rounded-lg', numberOfLines > 1);
    parentElement.classList.toggle('flex-row', numberOfLines <= 1);
    parentElement.classList.toggle('flex-col', numberOfLines > 1);
    parentElement.classList.toggle('items-center', numberOfLines <= 1);
    parentElement.classList.toggle('items-end', numberOfLines > 1);
    textarea.classList.toggle('mb-4', numberOfLines > 1);
};

const getConversationHistory = (containerElement) => {
    const prompts = containerElement.querySelectorAll('.chat_prompt');
    const answers = containerElement.querySelectorAll('.chat_answer');

    let history = '';

    prompts.forEach((prompt, index) => {
        history += `User: ${prompt.textContent.trim()}\n`;
        if (answers[index]) {
            history += `AI: ${answers[index].textContent.trim()}\n`;
        }
    });

    return history;
};

const saveChatToLocalStorage = (containerElement) => {
    const chatHistory = containerElement.innerHTML;
    localStorage.setItem('chatHistory', chatHistory);
};

const loadChatFromLocalStorage = (containerElement) => {
    const chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        containerElement.innerHTML = chatHistory;
    }
};

const bloggerGemini = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);
    if (elementContainer) {
        elementContainer.innerHTML = `
        <div class="elcreative_chat_container"></div>

        <div class="elcreative_chat_input_container flex min-h-[58px] w-full flex-row items-center justify-center rounded-full border border-blue-700 bg-white p-2 focus-within:shadow-md">
            <textarea class="w-full resize-none appearance-none border-transparent bg-transparent px-1.5 outline-none ring-0 text-black" rows="1" placeholder="Apa yang bisa kami bantu hari ini?"></textarea>
            <button class="relative flex w-auto h-auto cursor-pointer appearance-none rounded-full bg-blue-700 p-2 text-center text-sm text-white shadow transition-shadow hover:shadow-md focus:shadow-md active:shadow-lg" type="button" aria-label="Kirim" title="Kirim">
                <div class="flex flex-row items-center justify-center">
                    <svg class="shrink-0 grow-0" viewBox="0 0 24 24" fill="currentColor" height="24" width="24" aria-hidden="true">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                    </svg>
                    <span class="sr-only">Kirim</span>
                </div>
            </button>
        </div>
        `;

        const inputContainerChat = elementContainer.querySelector('.elcreative_chat_container');
        const inputContainer = elementContainer.querySelector('.elcreative_chat_input_container');
        const inputContainerTextarea = inputContainer.querySelector('textarea');
        const buttonSend = inputContainer.querySelector('button');

        loadChatFromLocalStorage(inputContainerChat);

        inputContainerTextarea.addEventListener('input', function () {
            adjustTextareaHeight(inputContainerTextarea);
        });

        buttonSend.addEventListener('click', async (event) => {
            event.preventDefault();

            const userInput = inputContainerTextarea.value.trim();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

            if (userInput) {
                conversationHistory = getConversationHistory(inputContainerChat);
                conversationHistory += `User: ${userInput}\n`;
                buttonSend.classList.toggle('hidden', true);
                buttonSend.classList.toggle('flex', false);

                inputContainerTextarea.value = '';
                adjustTextareaHeight(inputContainerTextarea);
                inputContainerChat.innerHTML += `
                <div class="chat_prompt mb-4 flex flex-row items-center justify-between">
                    <div class=""></div>
                    <div class="flex flex-col items-end justify-center rounded-b-lg rounded-tl-lg bg-blue-700/20 px-3">
                        <div class="w-auto">
                            <p>${userInput.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                        </div>
                        <div class="text-xs text-gray-500"></div>
                    </div>
                </div>`;

                saveChatToLocalStorage(inputContainerChat);

                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });

                try {
                    const model = await genAI.getGenerativeModel({
                        model: 'gemini-1.5-flash-latest',
                        parameters: {
                            temperature: 0.7,
                            max_tokens: 150,
                            top_p: 0.9,
                            top_k: 50,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                        }
                    });
                    const aiResponse = await model.generateContent(conversationHistory + `AI:`);
                    const responseText = await aiResponse.response.text();
                    const htmlContent = marked(responseText);

                    inputContainerChat.innerHTML += `
                    <div id="chat_answer" class="chat_answer mb-4 flex flex-row items-center justify-between">
                        <div class="flex w-full flex-col items-end justify-center rounded-b-lg rounded-tr-lg bg-black/10 px-3">
                            <div class="w-full overflow-x-auto">
                                ${htmlContent}
                            </div>
                            <div class="text-xs text-gray-500"></div>
                            <div class=""></div>
                        </div>
                    </div>`;
                    inputContainerChat.classList.add('mb-4');

                    saveChatToLocalStorage(inputContainerChat);

                    buttonSend.classList.toggle('hidden', false);
                    buttonSend.classList.toggle('flex', true);
                } catch (error) {
                    inputContainerChat.innerHTML += `<p class="mb-4 text-black">Terjadi Kesalahan: ${error}</p>`;
                }
            } else {
                inputContainerChat.innerHTML += `<p class="mb-4 text-black">Harap Masukkan Pertanyaan Anda terlebih dahulu.</p>`;
                inputContainerTextarea.focus();
            }
        });
    }
};

window.bloggerGemini = bloggerGemini;
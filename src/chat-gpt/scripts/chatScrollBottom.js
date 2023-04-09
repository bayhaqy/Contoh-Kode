export const chatScrollBottom = (options) => {
    const elementContainer = document.querySelector(options.elementContainer);

    elementContainer.scrollTop = elementContainer.scrollHeight;
};

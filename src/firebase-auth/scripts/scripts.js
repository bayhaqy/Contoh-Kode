
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";



const firebaseAuth = (options) => {
    if (location.href.indexOf(options.pageDashboard) != -1) {
        initializeApp(firebaseConfig);

        const firebaseAuth = getAuth();

        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem('auth_image', currentUser.photoURL);

                let templates = `
                <div class="flex w-full flex-col items-center justify-center rounded-lg border border-gray-400 py-3 px-3">
                    <img src='${currentUser.photoURL}' class='mb-2 rounded-full shadow-md p-2 bg-white w-20 h-20' />
                    <div class="mb-2 text-2xl font-bold">${currentUser.displayName}</div>
                    <div class="mb-3 text-gray-500">${currentUser.email}</div>
                    <button id='button_auth_signout' class="auth_google rounded-md text-white bg-blue-600 appearance-none outline-0 inline-flex items-center justify-center border-none px-3 py-2 cursor-pointer" type='button' aria-label='Logout'><span>Logout</span></button>
                </div>
                `;

                options.container.innerHTML = templates;

                // Sign Out
                const buttonSignOut = options.container.querySelector('#button_auth_signout');
                buttonSignOut.addEventListener('click', (event) => {
                    event.preventDefault();

                    signOut(firebaseAuth).then(() => {
                        localStorage.removeItem('auth_image');
                    })
                });
            } else {
                let templates = `
                <div class="flex w-full flex-col items-center justify-center rounded-lg border border-gray-400 py-3 px-3">
                    <img src='${document.querySelector("link[rel^='icon']").getAttribute('href')}' class='mb-2 rounded-full shadow-md p-3 bg-white w-10 h-10' />
                    <div class="mb-2 text-2xl font-bold">Welcome</div>
                    <div class="mb-3">Please Sign-In to continue</div>
                    <button id='auth_google' class="auth_google rounded-md text-white bg-blue-600 appearance-none outline-0 inline-flex items-center justify-center border-none px-3 py-2 cursor-pointer" type='button' aria-label='Sign in with Google'><svg class='mr-2' width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg><span>Sign in with Google</span></button>
                    <div class="mt-3 max-w-lg text-center text-sm text-gray-500">*Authentication Service will share your name, email address and profile picture.</div>
                </div>
                `;

                options.container.innerHTML = templates;
                options.container.querySelector('.auth_google').addEventListener('click', (event) => {
                    event.preventDefault();

                    const authProviderGoogle = new GoogleAuthProvider;
                    signInWithRedirect(firebaseAuth, authProviderGoogle).then(() => {
                        window.location.href = dashboardUrl;
                    }).catch((error) => {
                        window.location.href = '/';
                    })
                })
            }
        })
    }
}


const firebaseConfig = {
    apiKey: "AIzaSyCbeiP66A3aS68k7JJYOrIr5_jHvQ50OVI",
    authDomain: "materia-auth.firebaseapp.com",
    projectId: "materia-auth",
    storageBucket: "materia-auth.appspot.com",
    messagingSenderId: "497337413673",
    appId: "1:497337413673:web:357a3bdbe41624fd86ac38",
    measurementId: "G-YSV1HV0BJS",
};
firebaseAuth({
    pageDashboard: 'index.html',
    container: document.querySelector('.app'),
    signInButton: document.body,
})
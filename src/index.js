document.addEventListener('DOMContentLoaded', () => {
    // adding main container div to the body
    const mainContainer = document.createElement('div');
    mainContainer.innerText = 'This be that Sign Up';
    document.querySelector('body').appendChild(mainContainer);
  
    // adding form element into the main container
    const signIn = document.createElement('form');
    // on submit, get the inputs from the username and password and make a fetch request
    signIn.onsubmit = async (e) => {
        e.preventDefault();
            const username = document.querySelector('#username').value
            const password = document.querySelector('#password').value
         
             fetch('/createUser', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                resultArea.innerText = response.username + ' ' +response.password;
            })
        
    };
    
    // adding username, password, button, and results area and appending them to page 
    const usernameInput = document.createElement('input')
    usernameInput.setAttribute('type', 'text')
    usernameInput.setAttribute('id', 'username')
    usernameInput.setAttribute('placeholder', 'username');
    mainContainer.appendChild(signIn)
    signIn.appendChild(usernameInput)
    
    const passwordInput = document.createElement('input')
    passwordInput.setAttribute('type', 'password')
    passwordInput.setAttribute('placeholder', 'password')
    passwordInput.setAttribute('id', 'password')
    signIn.appendChild(passwordInput)

    const submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.innerText = 'Sign Up';
    signIn.appendChild(submitButton) 

    const resultArea = document.createElement('div')
    resultArea.setAttribute('id', 'resultArea')
    resultArea.innerText= 'placeholder'
    signIn.appendChild(resultArea);

})


// Alle HTML-skabeloner her!

const templates = {
    welcome: `
        <h1>Welcome to CD-lige Kitchen Dinners!</h1>
        <p>Who are you?</p>
        <button onclick="showExistingUser()">Choose existing user</button>
        <button onclick="showNewUserForm()">I'm new! Create account</button>
    `,
    existingUser: `
        <h2>Select your name</h2>
        <select id="userList"></select><br>
        <button onclick="loginUser()">Continue</button>
    `,
    newUser: `
        <h2>Create your account</h2>
        <input type="text" id="newUserName" placeholder="Enter your name"><br>
        <label for="dietSelect">Dietary restrictions (choose one or more):</label><br>
        <select id="dietSelect" multiple size="5" onchange="checkOtherOption()">
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten Free">Gluten Free</option>
            <option value="Lactose Free">Lactose Free</option>
            <option value="Other">Other</option>
        </select><br>
        <div id="otherDietDiv" class="hidden">
            <input type="text" id="otherDiet" placeholder="Please specify">
        </div><br>
        <button onclick="registerNewUser()">Register</button>
    `
};

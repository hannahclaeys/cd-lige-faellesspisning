// Alle HTML-skabeloner her!

const templates = {
    welcome: `
        <div class="fade-in">
            <h1>Welcome to CD-lige Kitchen Dinners!</h1>
            <p>Who are you?</p>
            <button onclick="showExistingUser()">Choose existing user</button>
            <button onclick="showNewUserForm()">I'm new! Create account</button>
        </div>
    `,
    existingUser: `
        <div class="fade-in">
            <h2>Select your name</h2>
            <select id="userList"></select><br>
            <button onclick="loginUser()">Continue</button>
        </div>
    `,
    newUser: `
        <div class="fade-in">
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

            <h3>Choose your avatar</h3>
            <div id="avatarSelection">
                <img src="avatars/avatar1.png" class="avatar" onclick="selectAvatar('avatar1.png')">
                <img src="avatars/avatar2.png" class="avatar" onclick="selectAvatar('avatar2.png')">
                <img src="avatars/avatar3.png" class="avatar" onclick="selectAvatar('avatar3.png')">
                <img src="avatars/avatar4.png" class="avatar" onclick="selectAvatar('avatar4.png')">
            </div>
            <br>

            <button onclick="registerNewUser()">Register</button>
            <br><br>
            <button onclick="loadTemplate('welcome')">Back</button>
        </div>
    `
};

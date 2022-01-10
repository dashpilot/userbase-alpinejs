function app(messageDelay) {
  const userbaseReady = false;
  const username = "";
  const password = "";
  const loggedIn = false;
  const email = "";
  const profile = null;
  const message = "";
  const showSignIn = false;
  const isError = false;
  const loading = false;

  return {
    userbaseReady: userbaseReady,
    username: username,
    password: password,
    email: email,
    profile: profile,
    message: "",
    showSignIn: true,
    loggedIn: loggedIn,
    isError: isError,
    loading: loading,

    items: [],

    msg(msg) {
      this.message = msg
      setTimeout(() => {
        this.message = null
      }, messageDelay)
    },

    init() {
      userbase
        .init({
          appId: "a9b0e582-9b46-4a57-ad10-1fe7f877d699"
        })
        .then(session => {
          this.userbaseReady = true;

          if (session.user) {
            this.username = session.user.username;
            this.email = session.user.email;
            this.profile = session.user.profile;
            this.loggedIn = true;
            this.isError = false;
            console.log(this.username + " is logged in");
          } else {
            this.loggedIn = false;
          }
        });
    },

    signUp(username, password) {
      this.loading = true;
      userbase
        .signUp({
          username,
          password
        })
        .then(user => {
          this.msg("Account created for " + username)
          this.loggedIn = true;
          this.isError = false;
          this.loading = false;
        })
        .catch(err => {
          this.msg("Error: Could not create account")
          this.isError = true;
          this.loading = false;
        });
    },

    signIn(username, password) {
      this.loading = true;
      userbase
        .signIn({
          username,
          password
        })
        .then(user => {
          this.msg(username + " logged in")
          this.loggedIn = true;
          this.isError = false;
          this.loading = false;

          userbase.openDatabase({
            databaseName: 'app',
            changeHandler: function(items) {
              // update your application state with the database items
              this.items = items;
            }
          }).then(() => {
            // the database can now be used

          }).catch((e) => console.error(e))


        })
        .catch(err => {
          this.msg("Error: username or password incorrect")
          this.isError = true;
          this.loading = false;
        });
    },

    signOut() {
      userbase.signOut().then(user => {
        // this.msg("Signed out")
        this.loggedIn = false;
      });
    }
  };
}
// Passport.js Configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err);
    });
  });
  
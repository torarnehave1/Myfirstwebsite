import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User'; // Assuming you have a User model

// Configure the local strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // Assuming you're using email as the username field
        },
        async (email, password, done) => {
            try {
                // Find the user in the database
                const user = await User.findOne({ email });

                // If user not found or password doesn't match, return error
                if (!user || !user.comparePassword(password)) {
                    return done(null, false, { message: 'Invalid email or password' });
                }

                // If user found and password matches, return the user
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
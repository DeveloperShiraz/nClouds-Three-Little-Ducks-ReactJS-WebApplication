import { signUp, confirmSignUp, signIn, signOut, getCurrentUser, resetPassword, confirmResetPassword } from 'aws-amplify/auth'

/**
 * Authentication Service
 * Wrapper around AWS Amplify Auth for centralized authentication logic
 */
const AuthService = {
    /**
     * Sign up a new user
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<Object>} Sign up result
     */
    async signUp(email, password) {
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email
                    }
                }
            })

            return {
                success: true,
                isSignUpComplete,
                userId,
                nextStep
            }
        } catch (error) {
            console.error('Sign up error:', error)
            return {
                success: false,
                error: error.message || 'Failed to sign up'
            }
        }
    },

    /**
     * Confirm sign up with verification code
     * @param {string} email - User's email address
     * @param {string} code - Verification code from email
     * @returns {Promise<Object>} Confirmation result
     */
    async confirmSignUp(email, code) {
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: email,
                confirmationCode: code
            })

            return {
                success: true,
                isSignUpComplete,
                nextStep
            }
        } catch (error) {
            console.error('Confirm sign up error:', error)
            return {
                success: false,
                error: error.message || 'Failed to confirm sign up'
            }
        }
    },

    /**
     * Sign in a user
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<Object>} Sign in result
     */
    async signIn(email, password) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: email,
                password
            })

            return {
                success: true,
                isSignedIn,
                nextStep
            }
        } catch (error) {
            console.error('Sign in error:', error)
            return {
                success: false,
                error: error.message || 'Failed to sign in'
            }
        }
    },

    /**
     * Sign out the current user
     * @returns {Promise<Object>} Sign out result
     */
    async signOut() {
        try {
            await signOut()
            return {
                success: true
            }
        } catch (error) {
            console.error('Sign out error:', error)
            return {
                success: false,
                error: error.message || 'Failed to sign out'
            }
        }
    },

    /**
     * Get the current authenticated user
     * @returns {Promise<Object>} Current user or null
     */
    async getCurrentUser() {
        try {
            const user = await getCurrentUser()
            return {
                success: true,
                user
            }
        } catch (error) {
            return {
                success: false,
                user: null
            }
        }
    },

    /**
     * Initiate password reset flow
     * @param {string} email - User's email address
     * @returns {Promise<Object>} Reset password result
     */
    async resetPassword(email) {
        try {
            const output = await resetPassword({ username: email })
            return {
                success: true,
                nextStep: output.nextStep
            }
        } catch (error) {
            console.error('Reset password error:', error)
            return {
                success: false,
                error: error.message || 'Failed to reset password'
            }
        }
    },

    /**
     * Confirm password reset with code and new password
     * @param {string} email - User's email address
     * @param {string} code - Verification code from email
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} Confirmation result
     */
    async confirmResetPassword(email, code, newPassword) {
        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword
            })
            return {
                success: true
            }
        } catch (error) {
            console.error('Confirm reset password error:', error)
            return {
                success: false,
                error: error.message || 'Failed to confirm password reset'
            }
        }
    }
}

export default AuthService

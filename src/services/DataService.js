import { generateClient } from 'aws-amplify/data'

// Generate the Amplify Data client lazily to ensure config is loaded
// Note: This requires amplify/data/resource.ts to be defined and backend deployed
let client = null;

const getClient = () => {
    if (!client) client = generateClient();
    return client;
}

/**
 * Data Service
 * Handle interactions with DynamoDB via Amplify Data Client
 */
const DataService = {
    /**
     * Create a new user profile
     * @param {Object} profileData - Profile data
     * @param {string} profileData.name - User's name
     * @param {string} profileData.role - User's role (DAD, MOM, GUARDIAN, OTHER)
     * @param {string} profileData.babyName - Baby's name
     * @param {string} profileData.babyBirthday - Baby's birthday (YYYY-MM-DD)
     * @param {string} profileData.babyGender - Baby's gender (BOY, GIRL, UNSPECIFIED)
     * @returns {Promise<Object>} Created profile or error
     */
    async createProfile(profileData) {
        try {
            const { errors, data: newProfile } = await getClient().models.UserProfile.create(profileData)

            if (errors) {
                throw new Error(errors[0].message)
            }

            return {
                success: true,
                profile: newProfile
            }
        } catch (error) {
            console.error('Create profile error:', error)
            return {
                success: false,
                error: error.message || 'Failed to create profile'
            }
        }
    },

    /**
     * Get the current user's profile
     * @returns {Promise<Object>} Profile or null if not found
     */
    async getUserProfile() {
        try {
            // List profiles where owner == current user (handled automatically by Amplify Auth rules)
            const { errors, data: profiles } = await getClient().models.UserProfile.list()

            if (errors) {
                // If we can't fetch profiles, returning null might be safer than throwing
                // to avoid blocking the app flow
                console.warn('Error fetching profiles:', errors)
                return { success: false, error: errors[0].message }
            }

            // Since owner auth is 1:1 for this use case, we expect 0 or 1 profile
            if (profiles.length > 0) {
                return {
                    success: true,
                    profile: profiles[0],
                    exists: true
                }
            }

            return {
                success: true,
                exists: false,
                profile: null
            }
        } catch (error) {
            console.error('Get profile error:', error)
            return {
                success: false,
                error: error.message || 'Failed to fetch profile'
            }
        }
    },

    /**
     * Update an existing user profile
     * @param {Object} profile - The existing profile object (must include id)
     * @param {Object} updates - The updates to apply
     * @returns {Promise<Object>} Updated profile or error
     */
    async updateProfile(profile, updates) {
        try {
            const { errors, data: updatedProfile } = await getClient().models.UserProfile.update({
                id: profile.id,
                ...updates
            })

            if (errors) {
                throw new Error(errors[0].message)
            }

            return {
                success: true,
                profile: updatedProfile
            }
        } catch (error) {
            console.error('Update profile error:', error)
            return {
                success: false,
                error: error.message || 'Failed to update profile'
            }
        }
    }
}

export default DataService

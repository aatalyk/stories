import { database } from './firebase'

export const fetchStories = async (callback) => {
    try {
        const ref = await database.ref().child('instructions')
        ref.on('value', (snapshot) => {
            const stories = []
            snapshot.forEach(child => {
                const item = child.val()
                stories.push({
                    title: item.title,
                    description: item.description
                })
            })
            callback(stories, null)
        })
    } catch (error) {
        callback([], error)
    }
}
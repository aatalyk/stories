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
                    description: item.description,
                    image: item.image,
                    songUri: item.songUri,
                    lyrics: item.lyrics
                })
            })
            callback(stories, null)
        })
    } catch (error) {
        callback([], error)
    }
}

export const fetchSongs = async (callback) => {
    try {
        const ref = await database.ref().child('instructions')
        ref.on('value', (snapshot) => {
            const songs = []
            snapshot.forEach(child => {
                const item = child.val()
                songs.push({
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    songUri: item.songUri,
                    lyrics: item.lyrics
                })
            })
            callback(songs, null)
        })
    } catch (error) {
        callback(null, error)
    }
}
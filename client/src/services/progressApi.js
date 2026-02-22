const API_URL = 'http://localhost:1488/api'

export const progressApi = {
    async save(tech , topicSlug , accessToken){
        const res = await fetch(`${API_URL}/progress` , {
            method:'POST',
                       headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include',
            body: JSON.stringify({ tech, topicSlug })
        })
        return res.json()
    },
    async get(accessToken){
        const res = await fetch(`${API_URL}/progress` , {
                        headers: { 
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include',
        })
        return res.json()
    }
}
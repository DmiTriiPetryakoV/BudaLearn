const API_URL = 'http://localhost:1488/api'

export const authApi = {
    async registration(email, password , username , grade , stack) {
        const res = await fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password ,username , grade , stack})
        })
        return res.json()
    }
}

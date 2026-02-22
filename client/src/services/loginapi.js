const API_URL = 'http://localhost:1488/api'



export const authLogin= {
    async login(email , password ){
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        return res.json()
        },
    async getProfile(){
        const res = await fetch(`${API_URL}/profile` , {
                    method: 'GET',
        headers: { 
            'Authorization': `Bearer ${токен}` 
        },
        credentials: 'include'
    })
        return res.json()
        }
}
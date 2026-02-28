const API_URL = 'https://budalearnbackend2.onrender.com'



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
            'Authorization': `Bearer ${accessToken}` 
        },
        credentials: 'include'
    })
        return res.json()
        }
}
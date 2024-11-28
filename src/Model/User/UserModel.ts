export interface UserRegister {
    username: string,
    email: string,
    password: string,
    user_profile: string,
    country_id: number,
    state_id: number,
    city_id: number
}

export interface LoginUser {
    email: string,
    password: string
}

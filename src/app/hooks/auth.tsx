import { useCookies } from "react-cookie";
export const useAuth = () =>{
    
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return{
        authed:cookies.token?true:false,
        login(token:string){
            setCookie('token',token);
        },
        logout(){
            removeCookie("token")
        }
    }
}
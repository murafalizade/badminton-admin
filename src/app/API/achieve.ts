import axios from "axios"
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import { BASE_URL } from "../../constants/constants"
import { IAchive } from "../../interfaces/IAchieve"

export const getAllAchievements = async (): Promise<IAchive[] | any[]> => {
    const res = await axios.get(BASE_URL + "/achievements")
    return res.data
}

export const deleteAchievementsById = async (id?: number) => {
    const token = Cookies.get('token');
    Swal.fire({
        title: 'Xəbəri silmək istəyirsiniz?',
        showCancelButton: true,
        confirmButtonText: 'Bəli',
        denyButtonText: `Xeyr`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            try {
                const res = await axios.delete(BASE_URL + `/achievements/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                console.log(res.data)
                Swal.fire('Xəbər uğurla silindi!', '', 'success').then(() => {
                    window.location.reload();
                })
            }
            catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta',
                    text: 'Xəbər silinə bilmədi!'
                })
            }
        } else if (result.isDenied) {
            return true;
        }
    })
}

export const postAchieve = async (achieve: IAchive) => {
    const token = Cookies.get('token');
    try {
        const res = await axios.post(BASE_URL + `/achievements`, achieve, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        Swal.fire('Nailliyyət uğurla yükləndi!', '', 'success').then(() => {
            window.location.reload();
        })
    }
    catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Nailliyyət yaradıla bilmədi!'
        })
    }
}

export const getAchieveById = async (id: number): Promise<IAchive | any> => {
    const achieves: IAchive[] = await getAllAchievements()
    const achieve: IAchive | any = achieves.filter(ach => ach.id === id)[0]
    return achieve
}

export const updateAchieve = async (id: number, achieve: IAchive) => {
    const token = Cookies.get('token')
    try {
        const res = await axios.put(BASE_URL + `/achievements/${id}`, achieve, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        Swal.fire('Nailliyyət yenilendi!', '', 'success').then(() => {
            window.location.reload();
        })
    }
    catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Nailliyyət yenilene bilmədi!'
        })
    }
}
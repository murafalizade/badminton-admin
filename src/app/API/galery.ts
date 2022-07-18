import axios from "axios"
import { log } from "console"
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import { BASE_URL } from "../../constants/constants"
import { IGalery, IGaleryDTO, IGaleryInput } from "../../interfaces/IGalery"

export const getAllGaleries = async (): Promise<IGalery[] | any[]> => {
    const res = await axios.get(BASE_URL + '/galleries')
    let a:IGalery[] = res.data;
    a.map(async (gl: IGalery) => {
        const test = await axios.get(BASE_URL + `/images/${gl.id}`)
        gl.images = [...test.data, { name: gl.thumbnail }]
    })
    console.log(a);
    return a
}

export const deleteGalery = async (id?: number) => {
    const token = Cookies.get('token');
    Swal.fire({
        title: 'Galerini silmək istəyirsiniz?',
        showCancelButton: true,
        confirmButtonText: 'Bəli',
        denyButtonText: `Xeyr`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            try {
                const res = await axios.delete(BASE_URL + `/galleries/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                console.log(res.data)
                Swal.fire('Galleri uğurla silindi!', '', 'success').then(() => {
                    window.location.reload();
                })
            }
            catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta',
                    text: 'Galleri silinə bilmədi!'
                })
            }
        } else if (result.isDenied) {
            return true;
        }
    })
}

export const createGalery = async (galery: IGaleryDTO) => {
    const token = Cookies.get('token');
    const req: IGaleryInput = {
        name: { az: galery.nameAz, ru: galery.nameRu, en: galery.nameEn }
    }
    // Create gallery
    const res = await axios.post(BASE_URL + '/galleries', req, { headers: { Authorization: `Bearer ${token}` } })
    // Upload thumbnail
    const uploadedGalery = await axios.post(BASE_URL + `/galleries/${res.data}/upload-thumbnail`, galery.images[0], { headers: { Authorization: `Bearer ${token}`, 'Content-Type': "multipart/form-data" } })
    console.log(uploadedGalery)
}

export const getGaleryById = async(id:number):Promise<IGalery | any> =>{
    const res = await axios.get(BASE_URL + `/galleries/${id}}`)
    const images = await axios.get(BASE_URL+`/images/${id}`)
    let galery:IGalery =  res.data
    galery.images = images.data
    galery.images.push({name:res.data.thumbnail})
    return galery
}
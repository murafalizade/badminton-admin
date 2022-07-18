import React from "react"
import axios from "axios"
import Cookies from 'js-cookie';
import Swal from "sweetalert2"
import { BASE_URL } from "../../constants/constants"
import { INews, INewsDTO } from "../../interfaces/INews"

export const getAllNews = async (): Promise<INews[] | any[]> => {
    try {
        const res = await axios.get(BASE_URL + '/news')
        return res.data
    }
    catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Xəbərlər yüklənə bilmədi!'
        })
    }
    return []
}

export const getNewsById = async (id: number): Promise<INews | any> => {
    const res = await axios.get(BASE_URL + `/news/${id}`);
    return res.data
}

export const deleteNewsById = async (id?: number) => {
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
                const res = await axios.delete(BASE_URL + `/news/${id}`, { headers: { Authorization: `Bearer ${token}` } })
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

export const postNews = async (news: INewsDTO) => {
    const token = Cookies.get('token');
    const req: INews = {
        title: { az: news.titleAz, ru: news.titleRu, en: news.titleEn },
        content: { en: news.contentEn, az: news.contentAz, ru: news.contentRu }
    }
    try {
        const res = await axios.post(BASE_URL + `/news`, req, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        const data = new FormData
        data.append('file', news.realPhoto)
        const image = await axios.post(BASE_URL + `/news/${res.data}/upload`,data,  { headers: { Authorization: `Bearer ${token}`, 'Content-Type': "multipart/form-data" } })
        Swal.fire('Xəbər uğurla yükləndi!', '', 'success').then(() => {
            window.location.reload();
        })
    }
    catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Xəbər yaradıla bilmədi!'
        })
    }
}

export const updateNews = async (id: number, news: INewsDTO) => {
    const token = Cookies.get('token');
    const req: INews = {
        photo: news.photo,
        title: { az: news.titleAz, ru: news.titleRu, en: news.titleEn },
        content: { en: news.contentEn, az: news.contentAz, ru: news.contentRu }
    }
    try {
        const res = await axios.put(BASE_URL + `/news/${id}`, req, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        Swal.fire('Xəbər uğurla yeniləndi!', '', 'success').then(() => {
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
}
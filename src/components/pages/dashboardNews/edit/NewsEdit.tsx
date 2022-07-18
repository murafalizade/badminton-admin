import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { INews, INewsDTO } from '../../../../interfaces/INews'
import uploadIcon from '../../../../assets/logos/uploadIcon.svg'
import changeIcon from '../../../../assets/logos/changeIcon.svg'
import removeIcon from '../../../../assets/logos/removeIcon.svg'
import { useParams } from 'react-router-dom'
import { getNewsById, updateNews } from '../../../../app/API/news'
import { BASE_URL } from '../../../../constants/constants'
import './NewsEdit.scss'

export const NewsEdit = () => {

    const [news, setNews] = useState<INewsDTO>({ titleAz: "", titleEn: "", titleRu: "", photo: "", contentEn: "", contentAz: "", contentRu: "" })

    // Change input value
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNews({ ...news, [e.target.name]: e.target.value });
    }

    // Handle image input
    const createImgObject = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0])
            setNews({ ...news, photo: url });
        }
    }

    // Get params id 
    const { id } = useParams()

    // Converting INews to INewsDTO 
    const convertType = (news: INews): INewsDTO => {
        const newsDTO: INewsDTO = {
            titleAz: news.title.az,
            titleEn: news.title.en,
            titleRu: news.title.ru,
            photo: `${BASE_URL}/news/image/${news.photo}`,
            contentEn: news.content.en,
            contentAz: news.content.az,
            contentRu: news.content.ru
        }
        return newsDTO
    }

    // Fetch news by id
    const fetchNewsById = async () => {
        if (id) {
            const param = parseInt(id);
            const news: INews = await getNewsById(param);
            setNews(convertType(news));
        }
    }

    // Update news
    const updateNewsById = () =>{
        if (id) {
            const param = parseInt(id);
            updateNews(param,news)
        }
    }

    useEffect(() => {
        fetchNewsById();
    }, [])

    return (
        <div className='dashboard-create-body'>
            <div className='create-body'>
                <Form>
                    <div className='form-first-row'>
                        {!news.photo ? (

                            <Form.Label className='upload-container'>
                                <img src={uploadIcon} alt="upload-icon" />
                                Şəkil yükləyin
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => createImgObject(e)} value={news.photo} type='file' accept="image/png, image/jpg, image/jpeg" name='img' />
                            </Form.Label>
                        ) : (<div>
                            <img className='upload-container' src={news.photo} />
                            <div className='icon-list'>
                                <img src={changeIcon} alt="change-icon" />
                                <img src={removeIcon} alt="remove-icon" onClick={() => { setNews({ ...news, photo: "" }) }} />
                            </div>
                        </div>)}
                        <div>
                            <Form.Label> Başlıq - Az
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="titleAz" value={news.titleAz} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - Ru
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="titleRu" value={news.titleRu} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - En
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="titleEn" value={news.titleEn} type='text' placeholder='Başlıq' />
                            </Form.Label>
                        </div>

                    </div>
                    <div className='form-second-row'>
                        <Form.Label> Mətn - Az
                            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} as='textarea' name='contentAz' value={news.contentAz} type='text' placeholder='Mətn' />
                        </Form.Label>

                        <Form.Label> Mətn - Ru
                            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} as='textarea' name='contentRu' value={news.contentRu} type='text' placeholder='Mətn' />
                        </Form.Label>

                        <Form.Label> Mətn - En
                            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} as='textarea' name='contentEn' value={news.contentEn} type='text' placeholder='Mətn' />
                        </Form.Label>
                    </div>

                    <div className='control-buttons'>
                        <Button href='/dashboard/news'>Ləğv elə</Button>
                        <Button onClick={()=>updateNewsById()}>Yadda Saxla</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

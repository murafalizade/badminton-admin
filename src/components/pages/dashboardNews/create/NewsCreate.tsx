import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import uploadIcon from '../../../../assets/logos/uploadIcon.svg'
import { INewsDTO } from '../../../../interfaces/INews'
import changeIcon from '../../../../assets/logos/changeIcon.svg'
import removeIcon from '../../../../assets/logos/removeIcon.svg'

import './NewsCreate.scss'
import { postNews } from '../../../../app/API/news'

export const NewsCreate = () => {

    const [news, setNews] = useState<INewsDTO>({ titleAz: "", titleEn: "", titleRu: "", photo: "", contentEn: "", contentAz: "", contentRu: "" })

    // Change input value
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNews({ ...news, [e.target.name]: e.target.value });
    }

    // Handle image input
    const createImgObject = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0])
            setNews({ ...news,realPhoto: e.target.files[0], photo: url });
        }
    }


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
                                <img src={changeIcon} alt="change-icon"/>
                                <img src={removeIcon} alt="remove-icon" onClick={() => { setNews({ ...news, photo: "" }) }} />
                            </div>
                            </div>)}
                        <div>
                            <Form.Label> Başlıq - Az
                                <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} name="titleAz" value={news.titleAz} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - Ru
                                <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} name="titleRu" value={news.titleRu} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - En
                                <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} name="titleEn" value={news.titleEn} type='text' placeholder='Başlıq' />
                            </Form.Label>
                        </div>

                    </div>
                    <div className='form-second-row'>
                        <Form.Label> Mətn - Az
                            <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} as='textarea' name='contentAz' value={news.contentAz} type='text' placeholder='Mətn' />
                        </Form.Label>

                        <Form.Label> Mətn - Ru
                            <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} as='textarea' name='contentRu' value={news.contentRu} type='text' placeholder='Mətn' />
                        </Form.Label>

                        <Form.Label> Mətn - En
                            <Form.Control onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)} as='textarea' name='contentEn' value={news.contentEn} type='text' placeholder='Mətn' />
                        </Form.Label>
                    </div>

                    <Button onClick={()=>postNews(news)}>Yarat</Button>

                </Form>
            </div>
        </div>
    )
}

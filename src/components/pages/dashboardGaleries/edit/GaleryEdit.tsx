import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import uploadIcon from '../../../../assets/logos/uploadIcon.svg'
import changeIcon from '../../../../assets/logos/changeIcon.svg'
import addIcon from '../../../../assets/logos/addIcon.svg'
import removeIcon from '../../../../assets/logos/removeIcon.svg'
import { IGalery, IGaleryDTO } from '../../../../interfaces/IGalery'
import { Carousel } from '../../../elements/carousel/Carousel'
import { createGalery, getGaleryById } from '../../../../app/API/galery'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../../../constants/constants'

export const GaleryEdit = () => {

    const [galery, setGalery] = useState<IGaleryDTO>({ nameAz: "", nameEn: "", nameRu: "", images: [] })
    const [currentImage, setCurrentImg] = useState<number>(0)

    // Converting IGalery to IGaleryDTO 
    const convertType = (galery: IGalery): IGaleryDTO => {
        const galeryDTO: IGaleryDTO = {
            nameAz: galery.name.az,
            nameEn: galery.name.en,
            nameRu: galery.name.ru,
            images: galery.images.map((img) => `${BASE_URL}/galleries/thumbnail/${img.name}`)
        }
        console.log(galery.images)
        return galeryDTO
    }
    // Get current Galery
    const { id } = useParams()

    const fetchGaleryById = async () => {
        if (id) {
            const params = parseInt(id)
            const currentGalery = await getGaleryById(params)
            setGalery(convertType(currentGalery))
        }
    }

    useEffect(() => {
        fetchGaleryById()
    }, [])

    // Change input value
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGalery({ ...galery, [e.target.name]: e.target.value })
    }

    // Handle image input
    const createImgObject = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0])
            const images = galery.images
            images.push(url)
            setGalery({ ...galery, images });
        }
    }

    // Get current slide
    const beforeChangeEvent = (currentSlide: number) => {
        console.log(currentSlide);
        setCurrentImg(currentSlide)
    }

    // Delete image from input
    const deleteImage = (id: number) => {
        const imgs = galery.images.filter((_, i) => i != id)
        setGalery({ ...galery, images: imgs })
    }

    // Replace image 
    const replaceImage = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target?.files[0])
            const images = galery.images
            images[id] = url
            console.log(images)
            setGalery({ ...galery, images })
        }
    }

    return (
        <div className='dashboard-create-body galery'>
            <div className='create-body'>
                <Form>
                    <div className='form-first-row'>
                        {galery.images.length === 0 ? (

                            <Form.Label className='upload-container'>
                                <img src={uploadIcon} alt="upload-icon" />
                                Şəkil yükləyin
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => createImgObject(e)} type='file' accept="image/png, image/jpg, image/jpeg" name='img' />
                            </Form.Label>
                        ) : (
                            <div className='slider-upload'>
                                <Carousel getSlide={beforeChangeEvent}>
                                    {galery.images?.map((glr, id) => (
                                        <div key={id}>
                                            <img className='upload-container' src={glr} />
                                        </div>
                                    ))}
                                </Carousel>
                                <div className='icon-list'>
                                    <Form.Label className='add-file'>
                                        <img src={addIcon} alt="add-icon" />
                                        <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => createImgObject(e)} type='file' accept="image/png, image/jpg, image/jpeg" name='img' />
                                    </Form.Label>

                                    <Form.Label className='add-file'>
                                        <img src={changeIcon} alt="change-icon" />
                                        <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => replaceImage(currentImage, e)} type='file' accept="image/png, image/jpg, image/jpeg" name='img' />
                                    </Form.Label>


                                    <Form.Label className='add-file'>
                                        <img src={removeIcon} alt="remove-icon" onClick={() => { deleteImage(currentImage) }} />
                                        <Form.Control disabled onChange={(e: React.ChangeEvent<HTMLInputElement>) => replaceImage(currentImage, e)} type='file' accept="image/png, image/jpg, image/jpeg" name='img' />
                                    </Form.Label>

                                </div>
                            </div>
                        )}

                        <div>
                            <Form.Label> Başlıq - Az
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="nameAz" value={galery.nameAz} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - Ru
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="nameRu" value={galery.nameRu} type='text' placeholder='Başlıq' />
                            </Form.Label>

                            <Form.Label> Başlıq - En
                                <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="nameEn" value={galery.nameEn} type='text' placeholder='Başlıq' />
                            </Form.Label>
                        </div>

                    </div>
                    
                    <div className='control-buttons'>
                        <Button href='/dashboard/news'>Ləğv elə</Button>
                        <Button >Yadda Saxla</Button>
                    </div>

                </Form>
            </div>
        </div>
    )

}

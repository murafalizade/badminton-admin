import { BASE_URL } from '../../../constants/constants'
import editIcon from '../../../assets/logos/editIcon.svg'
import xIcon from '../../../assets/logos/xIcon.svg'
import { IGaleryProps } from '../../../interfaces/IGalery'
import './GaleriesCard.scss'
import { Carousel } from '../carousel/Carousel'
import { deleteGalery } from '../../../app/API/galery'

export const GaleriesCard = ({ galery }: IGaleryProps) => {
    console.log(galery)
    return (
        <div className='galery-edit-card'>
            <div className='icon-list'>
                <div className='delete-icon'>
                    <a href={`/dashboard/galeries-edit/${galery.id}`}><img src={editIcon} alt='edit-icon' /></a>
                </div>
                <div onClick={() => deleteGalery(galery.id)} className='delete-icon'>
                    <img src={xIcon} alt='delete-icon' />
                </div>
            </div>
            <Carousel>
                {galery.images?.map((gl) => (
                    <div className='slider-image'>
                        <img className='galery-image' src={`${BASE_URL}/images/${gl.name}`} alt={galery.name['az']} />
                    </div>
                ))}
            </Carousel>
            <span className='pagenate'>1/{galery.images?.length}</span>

            <div>
                <h5>{galery?.name['az']}</h5>
            </div>
        </div>
    )
}

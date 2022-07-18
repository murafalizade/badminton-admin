import React from 'react'
import { BASE_URL } from '../../../constants/constants'
import { INewsProps } from '../../../interfaces/INews';
import editIcon from '../../../assets/logos/editIcon.svg'
import xIcon from '../../../assets/logos/xIcon.svg'
import './NewsCard.scss'
import { deleteNewsById } from '../../../app/API/news';

export const NewsCard = ({news}:INewsProps) => {

    return (
        <div  className='news-edit-card'>
            <img src={`${BASE_URL}/news/image/${news?.photo}`} alt={news?.title['az']} />
            <div>
                <h5>{news?.title['az']}</h5>
                <p>{news?.content['az']}</p>
                <div className='admin-card-footer'>
                    <span>14.12.2022</span>
                    <span>Daha çox {'>'}</span>
                </div>
            </div>
            <div className='delete-icon'>
                <a href={`/dashboard/news-edit/${news.id}`}><img src={editIcon} alt='edit-icon' /></a>
            </div>
            <div className='delete-icon'>
                <img onClick={() => deleteNewsById(news.id)} src={xIcon} alt='delete-icon' />
            </div>
        </div>
    )
}

import React from 'react'
import { deleteAchievementsById } from '../../../app/API/achieve'
import editIcon from '../../../assets/logos/editIcon.svg'
import xIcon from '../../../assets/logos/xIcon.svg'
import { IAchiveProps } from '../../../interfaces/IAchieve'
import './AchievementsCard.scss'

export const AchievementsCard = ({achieve}:IAchiveProps) => {
  return (
    <div className='news-edit-card achieve'>
      <div>
        <h5>{achieve.date}</h5>
        <p>{achieve.content}</p>
        <div className='admin-card-footer'>
          <span>{achieve.createdAt}</span>
        </div>
      </div>
      <div className='icon-div'>
        <div className='delete-icon'>
          <a href={`/dashboard/achievement-edit/${achieve.id}`}><img src={editIcon} alt='edit-icon' /></a>
        </div>
        <div onClick={()=>deleteAchievementsById(achieve.id)} className='delete-icon'>
          <img src={xIcon} alt='delete-icon' />
        </div>
      </div>
    </div>
  )
}

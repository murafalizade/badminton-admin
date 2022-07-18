import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getAllAchievements } from '../../../app/API/achieve'
import { IAchive } from '../../../interfaces/IAchieve'
import { AchievementsCard } from '../../elements/achievements/AchievementsCard'
import { Layout } from '../../elements/layout/Layout'

export const DashboardAchieves = () => {

    const [achieves, setAchieves] = useState<IAchive[] | any[]>([{id:12,content:"lDuis ipsum aliquip elit elit aliqua irure qui aliqua fugiat. Cillum anim elit anim aliquip adipisicing quis ex nisi veniam laboris adipisicing. Nisi sit ipsum tempor ad et incididunt consequat. Sunt irure est irure ex occaecat aliquip dolor irure dolor. Aute velit consectetur exercitation officia non culpa qui enim tempor nisi. Ullamco nisi ad exercitation incididunt culpa laborum sunt aliqua in ad ut deserunt enim pariatur. Eiusmod cillum sint laborum et eu sit proident pariatur dolor voluptate nisi ullamco sit.",date:"2020",createdAt:"30.10.2022"}])

    // Set all achieves to state
    const fetchAchieve = async () => {
        const res = await getAllAchievements()
        setAchieves(res)
    }

    useEffect(() => {
        fetchAchieve()
    }, [])

    return (
        <Layout addingType='achievement-add'>
            {achieves?.map((ach: IAchive) => (
                <AchievementsCard key={ach.id} achieve={ach} />
            ))}
        </Layout>
    )
}

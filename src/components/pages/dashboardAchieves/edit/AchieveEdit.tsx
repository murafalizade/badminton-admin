import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getAchieveById, updateAchieve } from '../../../../app/API/achieve'
import { IAchive } from '../../../../interfaces/IAchieve'

export const AchieveEdit = () => {

    const [achieve, setAchieve] = useState<IAchive>({ date: "", content: "" })

    // Get params id 
    const { id } = useParams()

    // Get current achieve 
    const fetchAchiehevById = async () => {
        if (id) {
            const params = parseInt(id)
            const achieve: IAchive = await getAchieveById(params)
            console.log(achieve)
            setAchieve(achieve)
        }
    }

    useEffect(() => {
        fetchAchiehevById()
    }, [])

    // Change input values
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAchieve({ ...achieve, [e.target.name]: e.target.value })
    }

    // Update achievements by id
    const updateAchieveById = () =>{
        if(id){
            const params = parseInt(id)
            updateAchieve(params,achieve)
        }
    }

    return (
        <div className='dashboard-create-body'>
            <div className='create-body'>
                <Form>
                    <div className='form-first-row achieve-row'>
                        <Form.Label> Tarix
                            <Form.Control value={achieve.date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} name="date" type='text' placeholder='Tarix' />
                        </Form.Label>
                        <Form.Label> Mətn
                            <Form.Control value={achieve.content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)} as='textarea' name='content' type='text' placeholder='Mətn' />
                        </Form.Label>
                        <div className='control-buttons'>
                            <Button href='/dashboard/achievements'>Ləğv elə</Button>
                            <Button onClick={() => updateAchieveById()}>Yadda Saxla</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

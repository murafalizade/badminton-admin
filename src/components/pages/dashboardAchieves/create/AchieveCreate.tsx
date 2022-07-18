import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { postAchieve } from '../../../../app/API/achieve'
import { IAchive } from '../../../../interfaces/IAchieve'
import './AchieveCreate.scss'

export const AchieveCreate = () => {

    const [achieve, setAchieve] = useState<IAchive>({ date: "", content: "" })

    // Change input values
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAchieve({ ...achieve, [e.target.name]: e.target.value })
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
                        <Button onClick={() => postAchieve(achieve)}>Yarat</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

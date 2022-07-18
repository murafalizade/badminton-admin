import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getAllGaleries } from '../../../app/API/galery'
import { IGalery } from '../../../interfaces/IGalery'
import { GaleriesCard } from '../../elements/galeries/GaleriesCard'
import { Layout } from '../../elements/layout/Layout'
import './DashboardGaleries.scss'

export const DashboardGaleries = () => {

    const [galeries, setGaleries] = useState<IGalery[] | any[]>([])

    // Set all galeries to state
    const fetchgaleries = async () => {
        const res = await getAllGaleries()
        setGaleries(res)
    }

    useEffect(() => {
        fetchgaleries()
    }, [])
    
    return (
        <Layout addingType='galeries-add'>
            <Container>
                <Row>
                    {galeries?.map((glr: IGalery) => (
                        <Col md={4} key={glr.id}>
                            <GaleriesCard  galery={glr} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    )
}

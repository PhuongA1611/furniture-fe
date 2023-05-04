import React from 'react'
import { Link } from 'react-router-dom';
import './ShipCard.scss'

const ShipCard = (props) => {
    const { id, name, phone, address, ward, district, province } = props;

    return (
        <div className='shipcard'>
            <div className='shipcard__heading'>
                <h3>Shipping address</h3>
                <Link to={`/account/addresses/edit/`+id}>Edit</Link>
            </div>
            <div className='shipcard__content'>
                <address>{name}<br />
                    {phone}<br />
                    {address}<br />
                    {ward}, {district}, {province}</address>
            </div>
        </div>
    )
}

export default ShipCard

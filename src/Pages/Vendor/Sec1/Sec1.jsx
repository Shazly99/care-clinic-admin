import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import oops from '../../../assets/Images/users/oops.png';

const Sec1 = () => {
    const [contactus, setContactus] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // get contactusSubCategories
    const contactusGet = async () => {
        let { data } = await axios.get(`https://cureclinckapi.amlakturks.com/public/api/getsection1`);
        setContactus(data.data); 
    }

    const handleActionSelect = async (id, action) => {
        if (action === "DELETED") {
            setShowDeleteModal(true);
        }
    };

    const handleDeleteUser = async (id) => {
        // Logic for deleting user with ID `selectedUserId`
        setShowDeleteModal(false);
        let { data } = await axios.post(`https://cureclinckapi.amlakturks.com/public/api/deletesection1?ID=${id}`, {});
        await contactusGet()
    }


    useEffect(() => {
        contactusGet()
    }, [])
    return (
        <>


            {
                contactus ?
                    <div className="app__Users ">
                        <Component.ButtonBase title={"Add  "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/section1/addsection1" />
                        <div className="app__Users-table">
                            <Table responsive={true} className='rounded-3 '>
                                <thead>
                                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                        <th>Lang</th>
                                        <th>SmallOne </th>
                                        <th> BigOne</th>
                                        <th>ColorOne </th>
                                        <th> SmallFirst</th>
                                        <th> SmallSec</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        contactus?.map((item, index) => (
                                            <tr key={index}>
                                                <td >
                                                    <div >
                                                        {item.Lang === '1' && "Arabic"}
                                                        {item.Lang === '2' && "English"}
                                                        {item.Lang === '3' && "French"}
                                                        {item.Lang === '4' && "Russian"}
                                                        {item.Lang === '5' && "Turkish"}
                                                    </div>
                                                </td>
                                                <td >
                                                    <div >
                                                        {item.SmallOne}
                                                    </div>
                                                </td>
                                                <td >
                                                    <div >
                                                        {item.BigOne}
                                                    </div>
                                                </td>
                                                <td >
                                                    <div >
                                                        {item.ColorOne}
                                                    </div>
                                                </td>
                                                <td >
                                                    <div>
                                                        <p style={{ width: '200px', whiteSpace: "pre-wrap", fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexDirection: 'column' }}>
                                                            {item.SmallFirst}
                                                        </p>
                                                    </div>

                                                </td>

                                                <td >
                                                    <div>

                                                        <p style={{ width: '200px', whiteSpace: "pre-wrap", fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexDirection: 'column' }}>
                                                            {item.SmallSec}

                                                        </p>
                                                    </div>
                                                </td>





                                                <td>
                                                    <div>

                                                        <span>
                                                            <DropdownButton
                                                                id={`dropdown-${item.IDBrandSubCategory}`}
                                                                title="Actions"
                                                                variant="outline-success"
                                                                onSelect={(eventKey) => handleActionSelect(item.IDBrandSubCategory, eventKey)}
                                                                className="DropdownButton "
                                                                drop={'down-centered'}
                                                            >
                                                                <Dropdown.Item eventKey="Edite" as={Link} to={`/section1/editsection1/${item.ID}`}>
                                                                    Edit
                                                                </Dropdown.Item>

                                                                <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                                                                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title className='text-center w-100 text-warning'>
                                                                            <h5 className='mb-0'>Warning Remove..</h5>
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <img src={oops} className='w-50 d-block mx-auto' alt="oops" loading="lazy" />

                                                                    </Modal.Body>
                                                                    <Modal.Footer className='  d-flex justify-content-center'>
                                                                        <Button variant="primary" onClick={() => handleDeleteUser(item.ID)}>
                                                                            Confirm
                                                                        </Button>
                                                                        <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
                                                                            Cancel
                                                                        </Button>
                                                                    </Modal.Footer>
                                                                </Modal>


                                                            </DropdownButton>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </Table>
                        </div>

                    </div>
                    : <Component.Loader />
            }
        </>
    )
}

export default Sec1

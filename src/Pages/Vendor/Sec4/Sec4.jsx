import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';

const Sec4 = () => {
    const [contactus, setContactus] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // get contactusSubCategories
    const contactusGet = async () => {
        let { data } = await axios.get(`https://cureclinckapi.amlakturks.com/public/api/getsection4`);
        setContactus(data.data);
        console.log(data.data);
    }

    const handleActionSelect = async (id, action) => {
        if (action === "DELETED") {
            setShowDeleteModal(true);
        }
    };

    const handleDeleteUser = async (id) => {
        // Logic for deleting user with ID `selectedUserId`
        setShowDeleteModal(false);
        let { data } = await axios.post(`https://cureclinckapi.amlakturks.com/public/api/deletesection4?ID=${id}`, {});
        await contactusGet()
    }


    useEffect(() => {
        contactusGet()
    }, [])
    return (
        <div className="app__Users ">
            <Component.ButtonBase title={"Add  "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/section4/addsection4" />
            <div className="app__Users-table">
                <Table responsive={true} className='rounded-3 '>
                    <thead>
                        <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                            <th>Lang</th>
               
                            <th> VideoURL</th>
                            <th>Title </th>
                            <th>body </th>
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
                                        </div>
                                    </td>
                 

                                    <td >
                                        <div >
                                            {item.VideoURL}
                                        </div>
                                    </td>
                                    <td >
                                        <div >
                                            {item.Title}
                                        </div>
                                    </td>
                                    <td >
                                        <div >
                                            {item.body}
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
                                                    <Dropdown.Item eventKey="Edite" as={Link} to={`/contactus/editcontactus/${item.ID}`}>
                                                        Edit
                                                    </Dropdown.Item>

                                                    <Dropdown.Item eventKey="DELETED">Deleted</Dropdown.Item>
                                                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete Client</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            Are you sure you want to delete this client?
                                                        </Modal.Body>
                                                        <Modal.Footer className='  d-flex justify-content-center'>
                                                            <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="danger" onClick={() => handleDeleteUser(item.ID)}>
                                                                Delete Now
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
    )
}

export default Sec4

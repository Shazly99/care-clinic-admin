import React, { useState } from 'react'
import { Table, DropdownButton, Dropdown, Modal, Button } from "react-bootstrap";
import { apiheader } from '../../../utils/fetchData.js';
import { Link } from 'react-router-dom';
import oops from '../../../assets/Images/users/oops.png';
import axios from 'axios';


function StaffTable({ usersList , getList , baseURL }) {


    const itemRemove = async (el) => {
        await axios.post(`${baseURL}deletestaff?ID=${el}`, {}, apiheader)
        .then(res => {
            getList();
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const [showRemove, setShowRemove] = useState(false);
    const handleCloseRemove = () => setShowRemove(false);
    const handleShowRemove = () => setShowRemove(true);



    return (
        <>
            <Table responsive={true} className='rounded-3 '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        usersList?.map((item, index) => (
                            <tr key={index}>

                                <td >
                                    <div>
                                        {item?.Name}
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        {item?.Desc}
                                    </div>
                                </td>
                                <td >
                                    <div style={{ width: '200px' , height: '120px'}}>
                                        {item?.Image !== null && item?.Image !== undefined ? 
                                            <img src={`https://cureclinckapi.amlakturks.com/storage/app/staff/${item?.Image}`} className='rounded-3 w-100 h-100' loading="lazy" alt="item-image" />
                                            :
                                            '_'
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div>

                                        <span>
                                            <DropdownButton
                                                id={`dropdown-${item.ID}`}
                                                title="Action"
                                                variant="outline-success"
                                                className="DropdownButton "
                                            >
                                                <Dropdown.Item eventKey="Edite" as={Link} to={`edit/${item.ID}`}>
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="DELETED" onClick={handleShowRemove}>Deleted</Dropdown.Item>

                                                <Modal style={{ zIndex: '9999999999' }} show={showRemove} onHide={handleCloseRemove} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title className='text-center w-100 text-warning'>
                                                            <h5 className='mb-0'>Warning Remove..</h5>
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <img src={oops} className='w-50 d-block mx-auto' alt="oops" loading="lazy" />
                                                    </Modal.Body>
                                                    <Modal.Footer className='d-flex justify-content-center align-items-center'>
                                                        <div className='d-flex justify-content-center align-content-center'>
                                                            <div className='baseBtn pe-0 me-2'>
                                                                <Button onClick={() => {
                                                                        itemRemove(item.ID);
                                                                }} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                                    Confirm
                                                                </Button>
                                                            </div>

                                                            <div className='baseBtn ps-0'>
                                                                <Button onClick={handleCloseRemove} variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
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
        </>
    )
}

export default StaffTable

import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, Badge} from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';

export default function Customer(){
    const [headcount, setHeadcount] = useState('')
    const [messages, setMessages] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios({
            method:'POST',
            url: 'https://e-reservation-python.herokuapp.com/update_headcount',
            data: {
                headcount: headcount
            }
        })
        .then((res) => {
            toast.success('Reservation success!')
            setHeadcount('')
            setMessages(res.data)
        })
        .catch((err) => {
            toast.error(err.response.data.msg)
        })
      }

    return (
        <div className='container mt-3 mb-3'>
            <h1><Badge color="secondary">Customer</Badge></h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="headcount">Number of Headcount</Label>
                    <Input
                    onChange={(e)=>setHeadcount(e.target.value)}
                    type="number"
                    name="headcount"
                    id="headcount"
                    placeholder="number of headcount"
                    value={headcount}
                    required="required"
                    />
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
            &nbsp;

            { 
                messages ?
                    messages.map((message, index)=>(
                        <ListGroup key={`customer no: ${index}`}>
                            <ListGroupItem color="info" className="justify-content-between">
                                <span><strong><Badge pill>{message.tables_required}</Badge> tables required</strong></span>
                            </ListGroupItem>
                            
                            {message.table_headcount_pair.map((pair)=>(
                                <ListGroupItem color="success" key={`${pair.count} on ${pair.name}`} className="justify-content-between">
                                    <span><strong><Badge pill>{pair.count}</Badge> customers head to <Badge pill>{pair.name}</Badge></strong></span>
                                </ListGroupItem>
                            ))}                                   
                            {message.remaining_headcount ?
                                <ListGroupItem color="danger" className="justify-content-between">
                                    <span><strong><Badge pill>{message.remaining_headcount}</Badge> customers are required to wait till next available table</strong></span>
                                </ListGroupItem>
                            : null
                            }   
                            {message.queue_no ? 
                                <ListGroupItem color="warning" className="justify-content-between">
                                    <span><strong>Queue no: <Badge pill>{message.queue_no}</Badge></strong></span>
                                </ListGroupItem>
                            : null
                            }   
                        </ListGroup>
                    ))       
                : null 
            }
        </div>
    )
}
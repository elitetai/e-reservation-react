import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from 'reactstrap'

export default function Tables(props){
    const {currentTableCount, setCurrentTableCount} = props
    const [tableName, setTableName] = useState([])
    const [currentQueue, setCurrentQueue] = useState([])
    const [queueNumber, setQueueNumber] = useState(null)
    let tableValue = []
    
    const handleInputChange = (e) => {
        // Select all of the available options (for multiple options selection)
        let options = e.target.options
        for (let i = 0, len = options.length; i < len; i++) {
            if (options[i].selected) {
                tableValue.push(options[i].value)
            }
        }
        setTableName(tableValue)
    }
      
    useEffect(() => {
        Axios.get('https://e-reservation-python.herokuapp.com/get_queue')
        .then((res) => {
          setCurrentQueue(res.data)
        })
    }, [currentTableCount])

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios({
            method: 'POST',
            url: 'https://e-reservation-python.herokuapp.com/allocate_queue',
            data: {
                queue_no: queueNumber,
                table_name: tableName
            }
        })
        .then((res) => {
            toast.success(`Queue no.${queueNumber} is assigned to Tables: ${tableName}`)
            setCurrentQueue(res.data[0].queue_list)
            setCurrentTableCount(res.data[1].table_count)
            setTableName('')
            setQueueNumber(null)
        })
        .catch((err) => {
            toast.error(err.response.data.msg)
            setTableName('')
            setQueueNumber(null)
          })
    }

    const disableAllocation = () => {
        if (queueNumber==null){
            return true
        } 
        if (!tableName.length){
            return true
        } else{
            return false
        }
    }
    
    return (
        <div className='container mb-3'>
            <h2 className="text-center">Queue Numbers Allocation</h2 >
            { currentQueue.length ?
                <Form onSubmit={handleSubmit} className='row'>
                    <ButtonGroup className="col-6 flex-wrap justify-content-center m-auto" >
                        { currentQueue.map((queue)=>{
                            return (
                                <div className="m-1" key={`table name: ${queue}`}>
                                    <Button 
                                    onClick={() => setQueueNumber(queue)} 
                                    id="queueNumber"
                                    outline
                                    color="primary" 
                                    >
                                        {queue}
                                    </Button>{' '}
                                </div>
                            )})
                        }
                    </ButtonGroup>
                    <FormGroup className="col-6">
                        <Label for="tableName">Hold Control key to select multiple tables</Label>
                        <Input 
                        onChange={handleInputChange}
                        type="select" 
                        name="tableName" 
                        id="tableName"
                        value={tableName} 
                        multiple>
                            { currentTableCount.length ?
                                currentTableCount.map((table)=>(
                                    <option className="text-center" key={`table name: ${table}`}>{table}</option>
                                    ))
                                    : null                                  
                                }
                        </Input>   
                    </FormGroup> 
                    {queueNumber? 
                        <h5 className="text-center">Queue Number {queueNumber} has been selected</h5>
                        :null
                    }
                    <Button 
                    color="primary" 
                    block
                    className="mt-2"
                    disabled={disableAllocation()}>
                        Allocate
                    </Button>
                </Form>
            : <p className="text-center">There is no queue right now</p>
            }
        </div>
    )
}
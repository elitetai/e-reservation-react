import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Badge} from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import Tables from '../components/Tables';

export default function Owner(){
    const [tableInput, setTableInput] = useState('')
    const [chairsPerTableInput, setChairsPerTableInput] = useState('')
    const [objectId, setObjectId] = useState(null)
    // table count = a list of tables 
    const [tableCount, setTableCount] = useState([])
    const [chairCount, setChairCount] = useState(null)

    const handleInputChange = (e) => {
      if (e.target.name === 'tables'){
        setTableInput(e.target.value)
      }
      if (e.target.name === 'chairsPerTable'){
        setChairsPerTableInput(e.target.value)
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      Axios({
          method:'POST',
          url: 'https://e-reservation-python.herokuapp.com/update_setting',
          data: {
            id: objectId,
            tables: tableInput,
            chairsPerTable:chairsPerTableInput
          }
      })
      .then((res) => {
        toast.success('The number of table and chair per table has been set!')
        setChairCount(res.data['chairsPerTable'])
        setTableInput('')
        setChairsPerTableInput('')
      })
      .catch((err) => {
        toast.error(err.response.data.msg)
      })
    }
    
    useEffect(() => {
      Axios.get('https://e-reservation-python.herokuapp.com/owner')
      .then((res) => {
        setObjectId(res.data[0]._id.$oid)
        setTableCount(res.data[1].table_count)
        setChairCount(res.data[0].chairsPerTable)
        })
      .catch((err) => {
        console.log(err.message)
      })
    }, [tableInput,chairCount])

    return (
        <div className='container mt-3 mb-3'>
        <h1><Badge color="secondary">Owner</Badge></h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="tables">Tables</Label>
                <Input
                onChange={handleInputChange}
                type="number"
                name="tables"
                id="tables"
                placeholder="number of tables"
                value={tableInput}
                required="required"
                />
            </FormGroup>
            <FormGroup>
                <Label for="chairsPerTable">Chairs Per Table</Label>
                <Input
                onChange={handleInputChange}
                type="number"
                name="chairsPerTable"
                id="chairsPerTable"
                placeholder="chairs per table"
                value={chairsPerTableInput}
                required="required"
                />
            </FormGroup>
            <Button color="primary">Set</Button>
        </Form>
        &nbsp;
        <Tables tableCount={tableCount} chairCount={chairCount}/>
        &nbsp;
        
        </div>
    )
}
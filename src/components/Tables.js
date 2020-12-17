import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Badge, ListGroup, ListGroupItem, Progress } from 'reactstrap';
import Queue from '../components/Queue';

export default function Tables(props){
    const {tableCount, chairCount} = props
    const [currentTableCount, setCurrentTableCount] = useState([])

    useEffect(() => {
        Axios.get('https://e-reservation-python.herokuapp.com/current_table_count')
        .then((res) => {
          setCurrentTableCount(res.data)
        })
    }, [tableCount])

    const removeOccupied = (value) => {
        Axios({
            method: 'POST',
            url: 'https://e-reservation-python.herokuapp.com/table_unallocate',
            data: {
                table_name: value.tables
            }
        })
        .then((res) => {
            toast.success(`${value.tables} is available!`)
            setCurrentTableCount(res.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    const count = currentTableCount.length /tableCount.length
    const tableBar = () =>{
        if (count>=0.75){
            return <Progress animated value={count*100} />
        } else if(count>=0.5){
            return <Progress animated color="success" value={count*100} />
        } else if(count>=0.25){
            return <Progress animated color="warning" value={count*100} />
        } else{
            return <Progress animated color="danger" value={count*100} />
        }
    }
    
    const occupiedTables = tableCount.filter(x => !currentTableCount.includes(x))

    return (
        <div className='container'>
            <div className="text-center">{currentTableCount.length} out of {tableCount.length} tables is/are available</div>
                {tableBar()}
            <h3 className="text-center">
                <Badge color="info" pill>Each table has {chairCount} chairs</Badge>
            </h3>
            &nbsp;

            <div className="row m-auto">
                <div className="col-6">
                    <h2 className="text-center">Tables Available</h2>
                    { currentTableCount.length ?
                        <ListGroup style={{maxHeight:"500px",overflow:"auto"}}>
                            {
                                currentTableCount.map((tables, index)=>(
                                    <ListGroupItem className="text-center m-1" key={`${index}- available tables:${tables}`}><strong>{tables}</strong></ListGroupItem>
                                    ))
                                }
                        </ListGroup>
                            : <p className="text-center">There is no table available</p>
                    }
                </div>

                <div className="col-6">
                    <h2 className="text-center">Tables Occupied</h2>
                    { occupiedTables.length ?
                        <ListGroup style={{maxHeight:"500px",overflow:"auto"}}>
                            {
                                occupiedTables.map((tables, index)=>{
                                    return (
                                        <div key={`i${index}-tables count:${tables}`}>
                                            <ListGroupItem className="text-center m-1" key={`${index}- occupied tables:${tables}`}>
                                                <strong>{tables}</strong>
                                                <input 
                                                type="button"
                                                name="occupiedTables"
                                                id={tables}
                                                value="Vacant"
                                                className="btn btn-sm btn-outline-success float-right"
                                                onClick={() => removeOccupied({tables})}
                                                />
                                            </ListGroupItem>
                    
                                        </div>
                                    )
                                })
                            }
                        </ListGroup>
                            : <p className="text-center">There is no table occupied</p>
                    }
                </div>
            </div>
            &nbsp;

            <Queue currentTableCount={currentTableCount} setCurrentTableCount={setCurrentTableCount}/>
        </div>
    )
}
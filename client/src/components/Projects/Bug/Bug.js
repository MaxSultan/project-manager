import React, { useState } from 'react'
import {Table} from 'semantic-ui-react'
import BugView from './BugView'
import { Link } from 'react-router-dom'

export default function Bug(props) {
    const [toggle, setToggle] = useState(false)
    var today = new Date();
    var startDate = new Date(props.date_work_began)
    const diffTime = Math.abs(startDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    var createDate = new Date(props.created_at).toDateString()
    var humanDueDate = new Date(props.dueDate).toDateString()
    const status = () => {
        if (diffDays >= 30){
            return (
                <Table.Row negative>
                    <Table.Cell><Link onClick={() => setToggle(!toggle)}>{props.title}</Link></Table.Cell>
                    <Table.Cell>{props.severity}</Table.Cell>
                    <Table.Cell>{props.assignedTo}</Table.Cell>
                    <Table.Cell>{diffDays}</Table.Cell>
                    <Table.Cell>{humanDueDate}</Table.Cell>
                    {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete} update={props.update}/>}
                </Table.Row>
            )
        }else{
            return (
                <Table.Row >
                    <Table.Cell><Link onClick={() => setToggle(!toggle)}>{props.title}</Link></Table.Cell>
                    <Table.Cell>{props.severity}</Table.Cell>
                    <Table.Cell>{props.assignedTo}</Table.Cell>
                    <Table.Cell>{diffDays}</Table.Cell>
                    <Table.Cell>{humanDueDate}</Table.Cell>
                    {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete} update={props.update}/>}
                </Table.Row>
            )
        }
    }

    return (
        <>
        {status()}
        </>
    )
}

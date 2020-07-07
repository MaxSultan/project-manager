import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import Axios from 'axios'
import Bug from './Bug'

export default function AllBugs() {
    const [bugs, setBugs] = useState([])

    const getAllBugs = () => {
        Axios.get('/bugs/all').then(
            res => setBugs(res.data)
        ).catch(err => console.log(err))
    }

    useEffect( () => {
        getAllBugs()
    }, [])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Severity</Table.HeaderCell>
                    <Table.HeaderCell>Assigned to:</Table.HeaderCell>
                    <Table.HeaderCell>Days worked on:</Table.HeaderCell>
                    <Table.HeaderCell>Current Stage</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {bugs.map(b => <Bug {...b}/>)}
            </Table.Body>
        </Table>
    )
}


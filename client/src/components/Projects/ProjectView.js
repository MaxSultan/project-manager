import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Segment, Header, Button, Table } from 'semantic-ui-react';
import Bug from './Bug/Bug';
import BugForm from './Bug/BugForm';

export default function ProductView(props){
    const [product, setProduct] = useState({})
    const [bugs, setBugs] = useState([])
    const [bugForm, setBugForm] = useState(false)
    const [developers, setDevelopers] = useState([])

    useEffect(()=> {
        Axios.get(`/api/projects/${props.match.params.id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))

        Axios.get(`/api/projects/${props.match.params.id}/bugs`)
        .then(res => {
            setBugs(res.data)
        })
        .catch(err => console.log(err))

        Axios.get('/api/users')
        .then(res => {
          setDevelopers(res.data.map(user => {
            return ({key: user.name, value: user.name , text: user.name }) 
            }))
        })
        .catch(err => console.log(err))
    },[])

    const addBug = (bugObj) => {
        setBugs([bugObj, ...bugs])
    }

    const deleteBug = (id) => {
        setBugs(bugs.filter(b => b.id !== id))
    }

    return(
        <>
        <div style={styles.contain} className={bugForm ? 'shrink' : 'grow'}>
            <Segment style={styles.contain}>
                <Header as='h1' textAlign='center'>{product.name}</Header>
                <h3>Bugs</h3>
                <Table celled>
                <Table.Header>
                <Table.Row >
                    <Table.HeaderCell style={styles.table}>Title</Table.HeaderCell>
                    <Table.HeaderCell style={styles.table}>Severity</Table.HeaderCell>
                    <Table.HeaderCell style={styles.table}>Assigned to:</Table.HeaderCell>
                    <Table.HeaderCell style={styles.table}>Days worked on:</Table.HeaderCell>
                    <Table.HeaderCell style={styles.table}>Current Stage</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {bugs.map(b => <Bug {...b} delete={deleteBug}/>)}
                </Table.Body>
                </Table>
                <Button style={{backgroundColor:'#58694e', color:'#d6d6e1'}}onClick={()=> setBugForm(!bugForm)}>Add New Bug</Button>
                <br/>
                <br/>
                <Button style={styles.button} onClick={() => props.history.push('/projects')}>Back</Button>
            </Segment>
        </div>
        {bugForm && <BugForm add={addBug} bugForm={bugForm} setBugForm={setBugForm} id={props.match.params.id} devOptions={developers}/>}
        </>
    )
}

const styles = {
    button: {
        backgroundColor: '#3f5164',
        color: '#d6d6e1',
    },
    contain: {
        backgroundColor: '#e5e3eb'
    },
    table: {
        backgroundColor:'#101c17',
        color:'#d6d6e1',
    }
}
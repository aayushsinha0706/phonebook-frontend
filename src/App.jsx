import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState('')
  const [notification, setNotification] = useState(null)
  const [category, setCategory] = useState('') 

  useEffect( () => {
    personService
     .getAll()
     .then(initialPersons => setPersons(initialPersons)) 
     .catch( (error) => console.error(error))
  }, [])

  const handleFilter = (event) => {
    setFilteredPerson(event.target.value)
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.some(person => person.name === newName)
    if (!personExists) {
      const personObject = {
        name: newName, number: newNumber
      }
      personService
       .create(personObject)
       .then(returnedPerson => { 
        setPersons(persons.concat(returnedPerson))
        setNotification(`${newName} is added to the phonebook`)
        setCategory('add')
        setTimeout(() => setNotification(null),5000)
      })
       .catch( (error) => {
        setNotification(error.response.data.error)
        setCategory('error')
        setTimeout(() => setNotification(null),5000)
       })
      setNewName('')
      setNewNumber('')
    }
    if (personExists) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one`)){
        updateNumber(persons.find(person => person.name === newName).id)        
      }
    }
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if( window.confirm(`Delete ${
      persons.find(person => person.id === id).name} `)){
      return(
        personService
        .Delete(id)
        .then(deletedPerson => {
          setPersons(persons.filter( person => person.id !== deletedPerson.id ))
          setNotification(`${deletedPerson.name} is deleted from the phonebook`)
          setCategory('delete')
          setTimeout(() => setNotification(null),5000)  
        })
        .catch(
          () => {
            setNotification(`Looks like ${personToDelete.name} has already been deleted from the phonebook`)
            setCategory('error')
            setTimeout(() => setNotification(null),5000)
            setPersons(persons.filter( person => person.id !== personToDelete.id ))
          }
        )
      )
    }
  }

  const updateNumber = (id) => {
    const personToUpdate = persons.find(person => person.id === id)
    const updatedPerson = {...personToUpdate, number: newNumber}
    personService
     .update(id, updatedPerson)
     .then(returnedPerson => {
      setPersons(persons.map(person => person.id === id ? returnedPerson : person ))
      setNotification(`Updated the phone number of ${persons.find(person => person.name === newName).name}`)
      setCategory('update')
      setTimeout(() => setNotification(null),5000)
    })
     .catch( (error) => {
      if (error.response.status === 404){
        setNotification(`The person ${persons.find(person => person.id === id).name} has already been deleted from the phonebook`)
        setCategory('error')
        setTimeout(() => setNotification(null),5000)
        setPersons(persons.filter( person => person.id!== id ))
      } else {
        setNotification(error.response.data.error)
        setCategory('error')
        setTimeout(() => setNotification(null),5000)
      }
    })
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification category={category} message={notification}/>
      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        handleInput={handleInput} 
        newName={newName} 
        handleNumberInput={handleNumberInput} 
        newNumber={newNumber} 
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPerson={filteredPerson} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
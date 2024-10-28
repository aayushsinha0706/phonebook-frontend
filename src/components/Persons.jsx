const Persons = ({persons, filteredPerson, handleDelete}) => {
    return (
        <div>
            {persons.filter(person => {
                return (
                    person.name.toLowerCase().includes(filteredPerson.toLowerCase())
                )
            }).map(person => {
                return (
                    <div key = {person.id}>
                        {person.name}{' '}{person.number}{' '}
                        <button onClick={ () => {
                            handleDelete(person.id)
                        }}>delete</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Persons
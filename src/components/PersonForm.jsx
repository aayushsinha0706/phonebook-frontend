const PersonForm = (
    {addPerson, handleInput, newName, handleNumberInput, newNumber}
) => {
    return (
    <div>
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={handleInput} value={newName}/>
            </div>
            <div>
                number: <input onChange={handleNumberInput} value={newNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
    )
}

export default PersonForm
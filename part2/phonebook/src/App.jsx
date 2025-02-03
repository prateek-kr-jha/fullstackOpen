import { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  );
};

const Persons = ({ persons, filter }) => {
  const filterRegex = new RegExp(filter, "i");
  const createPersonList = (person) => {
    return <Person name={person.name} number={person.number} key={person.id} />;
  };

  const filterFunction = (person) => {
    return filterRegex.test(person.name);
  };
  const personsToShow = persons.filter(filterFunction);
  return personsToShow.map(createPersonList);
};

const Form = ({
  handleSubmit,
  handleOnNameChange,
  handleOnNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleOnNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleOnNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ handleOnFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleOnFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      console.log(resp.data);
      setPersons(resp.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personAlreadyThere = persons.some((person) => {
      return person.name === newName || person.number === newNumber;
    });
    if (personAlreadyThere) {
      alert(`${newName} or ${newNumber} is already added to phonebook`);
      return;
    }
    console.log("event", event);
    if (newName === "") {
      alert("name can't be empty");
      return;
    }
    if (newNumber === "") {
      alert("number can't be empty");
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleOnNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleOnNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleOnFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnFilterChange={handleOnFilterChange} />
      <h3>Add a new</h3>
      <Form
        handleSubmit={handleSubmit}
        handleOnNameChange={handleOnNameChange}
        handleOnNumberChange={handleOnNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;

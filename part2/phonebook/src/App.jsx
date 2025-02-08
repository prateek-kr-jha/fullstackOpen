import { useState, useEffect } from "react";
import phonebook from "./service/phonebook";
import axios from "axios";

const Persons = ({ persons, filter, onDelete }) => {
  const filterRegex = new RegExp(filter, "i");
  const createPersonList = (person) => {
    console.log("meow ----");
    return (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => (onDelete(person.id))}>
          delete
        </button>
      </div>
    );
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
    phonebook.getAll().then((data) => {
      console.log(data);
      setPersons(data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const personAlreadyThere = persons.find((person) => {
      return person.name === newName;
    });
    console.log(personAlreadyThere);
    if(personAlreadyThere && newNumber != "" && personAlreadyThere.number != newNumber) {
      phonebook.changeNumber(personAlreadyThere.id, personObject).then(returnedPerson => {
        setPersons(persons.map(person => (person.name != returnedPerson.name) ? person : returnedPerson));
      });
      setNewName("");
      setNewNumber("");
      return;
    }
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


    phonebook.addPerson(personObject).then((returnedPerson) => {
      console.log("sending post request for ", returnedPerson);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
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

  const onDelete = (id) => {
    const deleteTarget = persons.find((person) => person.id == id);
    const deleteConfirmation = window.confirm(`Delete ${deleteTarget.name}?`);
    console.log(deleteConfirmation, "delete confirmation----");
    if (deleteConfirmation) {
      console.log("inside confirmation ", persons);
      phonebook.deletePerson(id);
      setPersons(persons.filter(person => person.id != id));
    }
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
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  );
};

export default App;

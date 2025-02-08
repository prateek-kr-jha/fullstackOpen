import { useState, useEffect } from "react";
import axios from "axios";
import phonebook from "./service/phonebook";

const Person = ({ id, name, number, onClick }) => {
  return (
    <div>
      {name} {number}
      <button onClick={onClick} id={id}>
        delete{" "}
      </button>
    </div>
  );
};

const Persons = ({ persons, filter }) => {
  const onClick = (event) => {
    console.log(event.target.id);
    window.co;
    phonebook.deletePerson(event.target.id).then((data) => {});
  };
  const filterRegex = new RegExp(filter, "i");
  const createPersonList = (person) => {
    return (
      <Person
        id={person.id}
        name={person.name}
        number={person.number}
        key={person.id}
        onClick={onClick}
      />
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
    };

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

  const onDelete = () => {};

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

import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import serviceClient from './services/numServiceClient'

import ErrorMessage from './components/Messages/ErrorMessage'
import SuccessMessage from './components/Messages/SuccessMessage'
import './App.css'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom'
import Header from './components/Layout/Header'
import AuthForm from './components/SignIn/AuthForm'
import loginService from './services/login'
import registerService from './services/register'
import SignIn from './components/SignIn/SignIn'

const App = () => {
    const [persons, setPersons] = useState([])
    const [user, setUser] = useState(null)
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')
    const [searchTerm, setsearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogIn, setShowLogIn] = useState(false)
    // const [startMenu, setShowStartMenu] = useState(true)

    const storedToken = localStorage.getItem('loggedPhoneAppUser')

    const history = useHistory()

    //Get data:
    useEffect(() => {
        if (loggedIn) {
            serviceClient
                .getAll()
                .then((initialPersons) => {
                    setPersons(initialPersons)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        } else {
            setPersons([])
        }
    }, [loggedIn])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedPhoneAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            serviceClient.setToken(user.token)
        }
    }, [])

    const handleLogin = async (userInfo) => {
        let user
        try {
            if (showLogIn) {
                user = await loginService.login(userInfo)
            } else {
                user = await registerService.register(userInfo)
            }
            setLoggedIn(true)
            window.localStorage.setItem(
                'loggedPhoneAppUser',
                JSON.stringify(user)
            )

            serviceClient.setToken(user.token)
            setUser(userInfo)
            history.push('/phonebook')
        } catch (exception) {
            console.log('exception', exception)
            console.log('error on login:', exception.response.data)

            if (JSON.stringify(exception.response.data).includes('unique')) {
                setErrorMessage(`Email '${userInfo.email}' is already in use`)

                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            } else if (
                JSON.stringify(exception.response.data).includes(
                    'invalid email or password'
                )
            ) {
                setErrorMessage('Invalid email or password')

                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }
    }

    const addNewPerson = async (e) => {
        e.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber,
        }

        const copyOfPersons = [...persons]

        const mapPersons = copyOfPersons.map((param) => {
            return param.name
        })

        if (
            mapPersons.includes(personObject.name) &&
            personObject.number.length === 0
        ) {
            alert(`${newName} is already added to phonebook`)

            return
        }

        //Modify phone number of person in a list:

        if (
            mapPersons.includes(personObject.name) &&
            personObject.number.length > 0
        ) {
            if (
                window.confirm(`${newName} is already added to phonebook, replace the
    old number with a new one?`)
            ) {
                const findPerson = persons.find(
                    ({ name }) => name === `${newName}`
                )

                const id = findPerson.id
                const update = persons.find((n) => n.id === id)
                const changedNum = { ...update, number: personObject.number }

                try {
                    const update = await serviceClient.update(id, changedNum)

                    setPersons(
                        persons.map((per) => (per.id !== id ? per : update))
                    )
                    setSuccessMessage(
                        `Changed ${newName}'s phone number successfully`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                } catch (exception) {
                    console.log('error on put:', exception)
                    setErrorMessage(
                        `Information of ${newName} has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter((n) => n.id !== id))
                }
            }
        }

        //create person:
        else {
            try {
                const waitNumbers = await serviceClient.create(
                    personObject,
                    user.token
                )

                setPersons(persons.concat(waitNumbers))
                setSuccessMessage(`Added ${newName}`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
            } catch (exception) {
                console.log('errorr', exception.response)
                // console.log("error.response.data:", error.response.data);
                const stringifyResult = JSON.stringify(exception.response.data)

                if (
                    personObject.name.length < 3 ||
                    personObject.number.length < 8
                ) {
                    setErrorMessage(`${stringifyResult}`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }
            }
        }

        setNewName('')

        setnewNumber('')
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setnewNumber(e.target.value)
    }

    const handleNameFilter = (e) => {
        setsearchTerm(e.target.value)
    }

    const results = !searchTerm
        ? persons
        : persons.filter((param) =>
              param.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          )

    // console.log('results', results)

    //   console.log('results', results.filter((p) => p.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())))

    const handleDelete = (e) => {
        const id = e.target.value

        const copyOfPersons = [...persons]

        const findId = { ...persons.find((param) => param.id === id) }

        if (window.confirm(`Delete ${findId.name} ?`)) {
            serviceClient
                .remove(id)
                .then(() => {
                    const filterById = copyOfPersons.filter(
                        (param) => param.id !== id
                    )

                    setPersons(filterById)
                    setSuccessMessage(
                        `Deleted name '${findId.name}' successfully`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch((error) => {
                    console.log('delete error:', error)
                })
        }
    }

    const logOut = () => {
        window.localStorage.clear()
        serviceClient.setToken(null)
        setShowSignUp(false)
        setShowLogIn(false)
        setLoggedIn(false)
        setSuccessMessage('Successfully logged out')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    return (
        <div>
            <Switch>
                {storedToken && (
                    <Route path='/' exact>
                        <Redirect to='/phonebook'></Redirect>
                    </Route>
                )}

                <Route path='/' exact>
                    <SignIn
                        setShowSignUp={setShowSignUp}
                        setShowLogIn={setShowLogIn}
                    />
                </Route>
                <Route path='/login'>
                    <ErrorMessage errorMessage={errorMessage} />
                    <SuccessMessage successMessage={successMessage} />
                    <AuthForm
                        handleLogin={handleLogin}
                        loggedIn={loggedIn}
                        setErrorMessage={setErrorMessage}
                        showLogIn={showLogIn}
                    />
                </Route>
                <Route path='/register'>
                    <ErrorMessage errorMessage={errorMessage} />
                    <SuccessMessage successMessage={successMessage} />
                    <AuthForm
                        handleLogin={handleLogin}
                        loggedIn={loggedIn}
                        setErrorMessage={setErrorMessage}
                    />
                </Route>
                {(loggedIn || storedToken) && (
                    <Route path='/phonebook'>
                        <div>
                            <Header logOut={logOut} />
                            <ErrorMessage errorMessage={errorMessage} />
                            <SuccessMessage successMessage={successMessage} />
                            <PersonForm
                                addNewPerson={addNewPerson}
                                newName={newName}
                                handleNameChange={handleNameChange}
                                newNumber={newNumber}
                                handleNumberChange={handleNumberChange}
                                searchTerm={searchTerm}
                                handleNameFilter={handleNameFilter}
                            />

                            <h3>Numbers: </h3>

                            <Persons
                                results={results}
                                handleDelete={handleDelete}
                                personid={results.map((p) => p.id)}
                            />
                        </div>
                    </Route>
                )}
            </Switch>
        </div>
    )
}

export default App

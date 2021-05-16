import React, { useMemo } from 'react'
import queryString from "query-string"
import { useLocation } from 'react-router'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../heroes/HeroCard'
import { getHeroByName } from '../../selectors/getHeroesByName'

export const SearchScreen = ({ history }) => {
    const location = useLocation()
    const { q = "" } = queryString.parse(location.search)

    const [formValues, handleInputChange] = useForm({
        searchText: q
    })

    const { searchText } = formValues

    const heroesFiltered = useMemo(() => getHeroByName(q), [q])


    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`?q=${searchText}`)
    }

    return (
        <div>

            <div className="row">
                <div className="col-5">
                    <h1>Search</h1>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn my-2 w-50 btn-dark"
                        >
                            Search
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    <h1> Results </h1>
                    <hr />

                    {(q === "") &&
                        <div className="alert alert-info">
                            Search a hero
                    </div>
                    }
                    {(q !== "" && heroesFiltered.length === 0) &&
                        <div className="alert alert-info">
                            There is no a hero with {q}
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

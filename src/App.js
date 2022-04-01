import './App.css';
import { useEffect, useState, useRef } from 'react';
import Card from './components/Card'
import api from './services/api'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(50);

  useEffect(() => {
    const newPokemons = [];
    api.get(`?limit=50&offset=${offset}`)
      .then(({ data }) => {
        data.results.forEach((p) => newPokemons.push(p.name))
        setPokemons((prevState) => ([...prevState, ...newPokemons]))
      })
    setLoading(true)
  }, [offset])

  const handleLoadClick = () => {
    setOffset(prevOffset => prevOffset = prevOffset + 5)
  }

  const pageEnd = useRef()
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          handleLoadClick()
        }
      }, { threshold: 1 })
      observer.observe(pageEnd.current)
    }


  }, [loading])

  return (
    <div className="App" style={{ padding: '0px 20px 40px' }}>
      <h1 style={{ fontSize: '60px', textAlign: 'center' }}>Infinite Scroller</h1>

      <div className="content">
        {
          pokemons.map((pokemon, index) => <Card key={index} name={pokemon}></Card>)
        }
        <div
          className="loading"
          onClick={handleLoadClick}
          ref={pageEnd}
        >
          Loading ...
        </div>
      </div>
    </div>
  );
}

export default App;

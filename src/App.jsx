import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'



function App() {
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [selectedUf, setSelectedUf] = useState([])
  const [county, setCounty] = useState([])
  const [selectedCities, setSelectedCities] = useState([])

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => {
      setUfs(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {
      setCities(response.data)
    })
  }, [selectedUf])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${selectedCities}/distritos`).then((response) => {
      setCounty(response.data)
    })
  }, [selectedCities])


  function handleSelectedUf(event) {
    const uf = event.target.value
    setSelectedUf(uf)
  }

  function handleSelectedCities(event) {
    const mcr = event.target.value
    setSelectedCities(mcr)
  }

  return (
    <>
      <div className="container">
        <h1>Seletor de UF e Cidades</h1>
        <select
          name="uf"
          id="uf"
          onChange={handleSelectedUf}
        >
          <option value="0">Selecione a UF</option>
          {ufs.map((uf) => (
            <option key={uf.id} value={uf.id}>{uf.nome}</option>
          ))}
        </select>

        <select name="city" id="city" onChange={handleSelectedCities}>
          <option value="0">Selecione  a cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.nome}</option>
          ))}
        </select>


        <div>
          {county.map((count) => (
            <div key={count.id} id='div-infos'>
              <p>Microrregião: {count.municipio.microrregiao.nome}</p>
              <p>Mesorregião:  {count.municipio.microrregiao.mesorregiao.nome}</p>
              <p>UF:  {count.municipio.microrregiao.mesorregiao.UF.sigla}</p>
              <p>Região:  {count.municipio.microrregiao.mesorregiao.UF.regiao.nome}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default App

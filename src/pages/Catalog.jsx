import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...Array.from(new Set(GUNS.map((g) => g.type))).sort()]

function Catalog({ addToCart }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortKey, setSortKey] = useState(null)   // 'name' | 'price' | null
  const [sortDir, setSortDir] = useState('asc')  // 'asc' | 'desc'

  function handleSort(key) {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc')
      else {
        setSortKey(null)
        setSortDir('asc')
      }
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    let list = GUNS.filter((gun) => {
      const matchSearch = gun.name.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === 'All' || gun.type === typeFilter
      return matchSearch && matchType
    })

    if (sortKey) {
      list = [...list].sort((a, b) => {
        let valA = sortKey === 'price' ? a.price : a.name.toLowerCase()
        let valB = sortKey === 'price' ? b.price : b.name.toLowerCase()
        if (valA < valB) return sortDir === 'asc' ? -1 : 1
        if (valA > valB) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }

    return list
  }, [search, typeFilter, sortKey, sortDir])

  function SortIcon({ active, dir }) {
    if (!active) return <span className="sort-icon neutral">⇅</span>
    return (
      <span className="sort-icon active">
        {dir === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  return (
    <>
      <section className="masthead">
        <h3 className="display">Kelompok 19 Shift 3</h3>
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        {/* Search + Filter Row */}
        <div className="catalog-controls">
          <div className="search-wrap">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="catalog-search"
              className="search-input"
              type="search"
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products by name"
            />
          </div>

          <div className="filter-wrap">
            {TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={typeFilter === type ? 'filter-chip active' : 'filter-chip'}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* List Header */}
        <div className="list-head">
          <div className="list-head-left">
            <h2>Current stock</h2>
            <span className="count">{filtered.length} piece{filtered.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="sort-btns">
            <button
              type="button"
              className={sortKey === 'name' ? 'sort-btn active' : 'sort-btn'}
              onClick={() => handleSort('name')}
              aria-label="Sort by name"
            >
              Name
              <SortIcon active={sortKey === 'name'} dir={sortDir} />
            </button>
            <button
              type="button"
              className={sortKey === 'price' ? 'sort-btn active' : 'sort-btn'}
              onClick={() => handleSort('price')}
              aria-label="Sort by price"
            >
              Price
              <SortIcon active={sortKey === 'price'} dir={sortDir} />
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          <ul className="stock">
            {filtered.map((gun) => (
              <GunCard key={gun.name} gun={gun} addToCart={addToCart} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog

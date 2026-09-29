import { useRef } from 'react'

function GunCard({ gun, addToCart }) {
  const popup = useRef(null)

  function handleAddToCart(e) {
    e.stopPropagation()
    addToCart(gun)
  }

  return (
    <li className="card">
      <button className="card-btn" onClick={() => popup.current.showModal()}>
        <div className="card-img-wrap">
          <img className="card-img" src={gun.image} alt={gun.name} />
        </div>
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <button
        type="button"
        className="card-add-btn"
        onClick={handleAddToCart}
        aria-label={`Add ${gun.name} to cart`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add to Cart
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <div className="popup-img-wrap">
          <img className="popup-img" src={gun.image} alt={gun.name} />
        </div>
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog" className="popup-actions">
          <button
            type="button"
            className="popup-add-btn"
            onClick={(e) => {
              addToCart(gun)
              popup.current.close()
            }}
          >
            Add to Cart
          </button>
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard

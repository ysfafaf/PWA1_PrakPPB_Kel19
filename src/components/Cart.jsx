function Cart({ cart, total, onClose, onRemove, onChangeQty }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="cart-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-header">
          <h2 className="cart-title display">Cart</h2>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(({ gun, qty }) => (
                <li key={gun.name} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img
                      className="cart-item-img"
                      src={gun.image}
                      alt={gun.name}
                    />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-name display">{gun.name}</span>
                    <span className="cart-item-type">{gun.type} · {gun.caliber}</span>
                    <span className="cart-item-price">${(gun.price * qty).toLocaleString()}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onChangeQty(gun.name, -1)}
                      aria-label={`Decrease quantity of ${gun.name}`}
                    >
                      −
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onChangeQty(gun.name, 1)}
                      aria-label={`Increase quantity of ${gun.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => onRemove(gun.name)}
                      aria-label={`Remove ${gun.name} from cart`}
                      title="Remove"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-value display">${total.toLocaleString()}</span>
              </div>
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default Cart

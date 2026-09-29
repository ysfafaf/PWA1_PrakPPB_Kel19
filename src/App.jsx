import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './components/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([]) // [{gun, qty}]
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.gun.price * item.qty, 0)

  function addToCart(gun) {
    setCart((prev) => {
      const existing = prev.find((item) => item.gun.name === gun.name)
      if (existing) {
        return prev.map((item) =>
          item.gun.name === gun.name ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { gun, qty: 1 }]
    })
  }

  function removeFromCart(gunName) {
    setCart((prev) => prev.filter((item) => item.gun.name !== gunName))
  }

  function changeQty(gunName, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.gun.name === gunName ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="main">
        {tab === 'Catalog' && <Catalog addToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />

      {cartOpen && (
        <Cart
          cart={cart}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
        />
      )}
    </div>
  )
}

export default App

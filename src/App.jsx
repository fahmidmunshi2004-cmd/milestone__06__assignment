import { useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import heroImage from './assets/hero.png'
import products from './data/products.json'

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '200+', label: 'Premium Tools' },
  { value: '4.9', label: 'User Rating' },
]

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in seconds and set up your workspace for digital tools.',
    icon: '👤',
  },
  {
    number: '02',
    title: 'Choose Products',
    description: 'Browse the collection and add the tools that match your goals.',
    icon: '🧰',
  },
  {
    number: '03',
    title: 'Start Creating',
    description: 'Use your selected tools immediately and move faster with confidence.',
    icon: '🚀',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/Month',
    subtitle: 'Perfect for getting started',
    features: ['Access to 10 free tools', 'Basic templates', 'Community support', '1 project per month'],
    button: 'Get Started Free',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/Month',
    subtitle: 'Best for professionals',
    features: ['Access to all premium tools', 'Unlimited templates', 'Priority support', 'Cloud sync'],
    button: 'Start Pro Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/Month',
    subtitle: 'For teams and businesses',
    features: ['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support'],
    button: 'Contact Sales',
  },
]

function App() {
  const [activeView, setActiveView] = useState('products')
  const [cartItems, setCartItems] = useState([])
  const [addedIds, setAddedIds] = useState([])

  const cartCount = cartItems.length

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0),
    [cartItems],
  )

  const handleAddToCart = (product) => {
    const alreadySelected = cartItems.some((item) => item.id === product.id)

    if (alreadySelected) {
      toast.info(`${product.name} is already in the cart`)
      return
    }

    setCartItems((current) => [...current, product])
    setAddedIds((current) => [...current, product.id])
    setActiveView('cart')
    toast.success(`${product.name} added to cart`)
  }

  const handleRemoveItem = (productId) => {
    const removedProduct = cartItems.find((item) => item.id === productId)

    setCartItems((current) => current.filter((item) => item.id !== productId))
    setAddedIds((current) => current.filter((id) => id !== productId))

    if (removedProduct) {
      toast.warning(`${removedProduct.name} removed from cart`)
    }
  }

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.info('Your cart is already empty')
      return
    }

    setCartItems([])
    setAddedIds([])
    toast.success('Checkout complete. Cart cleared.')
  }

  return (
    <div className="page-shell">
      <ToastContainer position="top-right" autoClose={1800} theme="colored" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="DigiTools home">
            <span className="brand-mark">D</span>
            <span className="brand-text">DigiTools</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#products">Products</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Cart summary">
              <span className="cart-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6h15l-2 8H8L6 6Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6 5.2 3.5H3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="9" cy="19" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="cart-count">{cartCount}</span>
            </button>
            <a className="ghost-link" href="#footer">
              Login
            </a>
            <a className="primary-link" href="#pricing">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">New · AI-Powered Tools Available</span>
              <h1>Supercharge Your Digital Workflow</h1>
              <p>
                Access premium AI tools, design assets, templates, and productivity software in
                one place. Start creating faster with DigiTools.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#products">
                  Explore Products
                </a>
                <a className="secondary-button" href="#pricing">
                  Watch Demo
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-card-glow" />
              <img src={heroImage} alt="" />
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="Digital tool statistics">
          <div className="container stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="container section-head">
            <span className="section-kicker">Premium Digital Tools</span>
            <h2>Choose the tools that fit your workflow</h2>
            <p>
              Explore a curated collection of digital products designed to help you work faster
              and create better results.
            </p>
          </div>

          <div className="container view-switch">
            <button
              className={activeView === 'products' ? 'switch-pill active' : 'switch-pill'}
              type="button"
              onClick={() => setActiveView('products')}
            >
              Products
            </button>
            <button
              className={activeView === 'cart' ? 'switch-pill active' : 'switch-pill'}
              type="button"
              onClick={() => setActiveView('cart')}
            >
              Cart ({cartCount})
            </button>
          </div>

          {activeView === 'products' ? (
            <div className="container card-grid">
              {products.map((product) => {
                const isAdded = addedIds.includes(product.id)

                return (
                  <article key={product.id} className="product-card">
                    <div className={`tag-badge ${product.tagType.replace(/\s+/g, '-')}`}>
                      {product.tag}
                    </div>
                    <div className="product-icon">{product.icon}</div>
                    <div className="product-copy">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="price-row">
                      <strong>${product.price}</strong>
                      <span>/{product.period}</span>
                    </div>
                    <span className="period-chip">{product.tagType}</span>
                    <ul className="feature-list">
                      {product.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <button
                      className={isAdded ? 'buy-button added' : 'buy-button'}
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      {isAdded ? 'Added to Cart' : 'Buy Now'}
                    </button>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="container cart-panel">
              <div className="cart-header">
                <div>
                  <h3>Your Cart</h3>
                  <p>
                    {cartItems.length
                      ? `${cartItems.length} selected product${cartItems.length > 1 ? 's' : ''}`
                      : 'Your cart is empty right now.'}
                  </p>
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>${cartTotal}</strong>
                </div>
              </div>

              {cartItems.length ? (
                <>
                  <div className="cart-list">
                    {cartItems.map((item) => (
                      <article key={item.id} className="cart-item">
                        <div className="cart-item-icon">{item.icon}</div>
                        <div className="cart-item-copy">
                          <h4>{item.name}</h4>
                          <span>${item.price}</span>
                        </div>
                        <button
                          className="remove-button"
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </article>
                    ))}
                  </div>

                  <button className="checkout-button" type="button" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <div className="empty-cart">
                  <p>No products have been added yet.</p>
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => setActiveView('products')}
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="steps-section" id="features">
          <div className="container section-head narrow">
            <span className="section-kicker">How It Works</span>
            <h2>Get started in 3 simple steps</h2>
            <p>Pick your tools, add them to cart, and begin creating without a steep learning curve.</p>
          </div>

          <div className="container steps-grid">
            {steps.map((step) => (
              <article key={step.number} className="step-card">
                <span className="step-number">{step.number}</span>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="container section-head narrow">
            <span className="section-kicker">Pricing Plans</span>
            <h2>Simple, transparent pricing</h2>
            <p>Choose a plan that fits your work, your team, and your budget.</p>
          </div>

          <div className="container pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={plan.featured ? 'pricing-card featured' : 'pricing-card'}
              >
                {plan.featured && <span className="featured-badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <p className="plan-subtitle">{plan.subtitle}</p>
                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </div>
                <ul className="feature-list compact">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button className={plan.featured ? 'buy-button light' : 'buy-button'} type="button">
                  {plan.button}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="testimonials">
          <div className="container cta-inner">
            <span className="section-kicker light">Ready to transform your workflow?</span>
            <h2>Build faster with premium digital tools</h2>
            <p>
              Join thousands of creators and teams who use DigiTools to save time and ship better
              work.
            </p>
            <div className="hero-actions centered">
              <a className="secondary-button light" href="#products">
                Explore Products
              </a>
              <a className="primary-button light" href="#pricing">
                View Pricing
              </a>
            </div>
          </div>
        </section>

        <section className="faq-strip" id="faq">
          <div className="container faq-grid">
            <article>
              <h3>Fast checkout</h3>
              <p>Add a tool, review the cart, and complete checkout in a single view.</p>
            </article>
            <article>
              <h3>Responsive design</h3>
              <p>The whole layout adapts smoothly across desktop, tablet, and mobile screens.</p>
            </article>
            <article>
              <h3>Toast feedback</h3>
              <p>Add, remove, and checkout actions are confirmed with clean toast notifications.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">D</span>
              <span className="brand-text">DigiTools</span>
            </a>
            <p>
              Premium digital tools for creators, freelancers, and growing teams who want a
              modern buying experience.
            </p>
          </div>

          <div>
            <h4>Product</h4>
            <a href="#products">Products</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#home">About</a>
            <a href="#faq">FAQ</a>
            <a href="#footer">Contact</a>
          </div>

          <div>
            <h4>Follow</h4>
            <a href="#home">Facebook</a>
            <a href="#home">LinkedIn</a>
            <a href="#home">X</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 DigiTools. All rights reserved.</span>
          <div className="footer-links">
            <a href="#home">Privacy</a>
            <a href="#home">Terms</a>
            <a href="#home">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

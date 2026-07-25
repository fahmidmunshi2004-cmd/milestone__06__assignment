import { useMemo, useState } from 'react'
import {
  FiCamera,
  FiFeather,
  FiFileText,
  FiLayers,
  FiPackage,
  FiSettings,
  FiShoppingCart,
  FiSmartphone,
  FiUser,
  FiZap,
} from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import heroImage from './assets/hero.png'
import logoImage from './assets/logo.png'
import products from './data/products.json'

const toolIcons = {
  FiFeather,
  FiLayers,
  FiCamera,
  FiSettings,
  FiFileText,
  FiSmartphone,
}

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '200+', label: 'Premium Tools' },
  { value: '4.9', label: 'User Rating' },
]

const stepCards = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in seconds and set up your workspace for digital tools.',
    Icon: FiUser,
  },
  {
    number: '02',
    title: 'Choose Products',
    description: 'Browse the collection and add the tools that match your goals.',
    Icon: FiPackage,
  },
  {
    number: '03',
    title: 'Start Creating',
    description: 'Use your selected tools immediately and move faster with confidence.',
    Icon: FiZap,
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

const faqCards = [
  {
    title: 'Fast checkout',
    text: 'Add a tool, review the cart, and complete checkout in a single view.',
  },
  {
    title: 'Responsive design',
    text: 'The whole layout adapts smoothly across desktop, tablet, and mobile screens.',
  },
  {
    title: 'Toast feedback',
    text: 'Add, remove, and checkout actions are confirmed with clean toast notifications.',
  },
]

function SectionHeader({ eyebrow, title, text, titleClass = '', wide = false, showEyebrow = true }) {
  return (
    <div className="mx-auto max-w-[1200px] px-5 text-center">
      {showEyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(109,56,255,0.10)] px-3.5 py-2 text-sm font-bold tracking-[-0.02em] text-[#4f39f6] [font-family:var(--second-family)]">
          {eyebrow}
        </span>
      )}
      <h2
        className={`mx-auto mt-3 mb-2 text-center text-[48px] font-extrabold capitalize leading-[1.15] tracking-[-0.05em] text-[#101727] max-md:text-[40px] ${wide ? 'max-w-[16ch]' : 'max-w-[14ch]'
          } ${titleClass}`}
      >
        {title}
      </h2>
      <p className="mx-auto max-w-[620px] leading-7 text-slate-600">{text}</p>
    </div>
  )
}

function App() {
  const [view, setView] = useState('products')
  const [cart, setCart] = useState([])
  const [addedIds, setAddedIds] = useState([])

  const cartCount = cart.length
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info(`${product.name} is already in the cart`)
      return
    }

    setCart((current) => [...current, product])
    setAddedIds((current) => [...current, product.id])
    toast.success(`${product.name} added to cart`)
  }

  const removeFromCart = (productId) => {
    const removed = cart.find((item) => item.id === productId)

    setCart((current) => current.filter((item) => item.id !== productId))
    setAddedIds((current) => current.filter((id) => id !== productId))

    if (removed) toast.warning(`${removed.name} removed from cart`)
  }

  const clearCart = () => {
    if (!cart.length) {
      toast.info('Your cart is already empty')
      return
    }

    setCart([])
    setAddedIds([])
    toast.success('Checkout complete. Cart cleared.')
  }

  const pageBg = 'bg-white'
  const uiFont = '[font-family:var(--second-family)]'
  const bodyFont = '[font-family:var(--font-family)]'
  const primaryBtn =
    'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7] px-6 py-3.5 font-bold tracking-[-0.02em] text-white shadow-[0_14px_32px_rgba(79,57,246,0.22)] transition hover:opacity-95'
  const secondaryBtn =
    'inline-flex items-center justify-center rounded-full border border-[#8b5cf6]/30 bg-white px-6 py-3.5 font-bold tracking-[-0.02em] text-[#4f39f6] transition hover:bg-slate-50'
  const cardShell = 'rounded-[24px] border border-slate-200 bg-white/95 shadow-[0_14px_35px_rgba(16,23,39,0.05)]'
  const heroTitle =
    'max-w-[12ch] text-[72px] font-extrabold capitalize leading-[117%] tracking-[-0.06em] text-[#101727] max-md:text-[clamp(3rem,10vw,4.25rem)]'

  return (
    <div className={`min-h-screen text-[#101727] ${bodyFont} ${pageBg}`}>
      <ToastContainer position="top-right" autoClose={1800} theme="colored" />

      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-[1200px] items-center justify-between gap-5 px-5">
          <a className="inline-flex items-center gap-3 text-inherit no-underline" href="#home" aria-label="DigiTools home">
            <img className="h-10 w-auto" src={logoImage} alt="DigiTools" />
          </a>

          <nav className={`hidden items-center gap-6 lg:flex ${uiFont}`} aria-label="Primary">
            {['Products', 'Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
              <a
                key={item}
                className="text-[15px] font-medium tracking-[-0.02em] text-slate-700 transition hover:text-[#4f39f6]"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <button className="inline-flex items-center gap-2 border-0 bg-transparent text-[#101727]" type="button" aria-label="Cart summary">
              <FiShoppingCart className="h-[22px] w-[22px]" aria-hidden="true" />
              <span className={`grid min-w-6 place-items-center rounded-full bg-[rgba(79,57,246,0.12)] px-2 text-sm font-bold text-[#4f39f6] ${uiFont}`}>
                {cartCount}
              </span>
            </button>
            <a className={`hidden text-[15px] font-bold tracking-[-0.02em] text-slate-700 transition hover:text-[#4f39f6] sm:inline-flex ${uiFont}`} href="#footer">
              Login
            </a>
            <a className={primaryBtn} href="#pricing">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="px-0 pb-8 pt-16">
          <div className="mx-auto grid max-w-[1200px] items-center gap-11 px-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full bg-[rgba(109,56,255,0.10)] px-3.5 py-2 text-sm font-bold tracking-[-0.02em] text-[#4f39f6] ${uiFont}`}>
                New · AI-Powered Tools Available
              </span>
              <h1 className={`${heroTitle} mt-4 mb-4 ${uiFont}`}>Supercharge Your Digital Workflow</h1>
              <p className="max-w-[620px] text-[1.08rem] leading-7 text-slate-600">
                Access premium AI tools, design assets, templates, and productivity software in one place. Start creating faster with DigiTools.
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <a className={primaryBtn} href="#products">
                  Explore Products
                </a>
                <a className={secondaryBtn} href="#pricing">
                  Watch Demo
                </a>
              </div>
            </div>

            <div className="relative grid min-h-[460px] place-items-center">
              <div className="absolute inset-[56px_34px] rounded-[22px] bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.9),rgba(255,255,255,0.35)_45%,rgba(109,56,255,0.05)_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85),0_26px_60px_rgba(16,23,39,0.08)]" />
              <img className="relative h-auto w-full max-w-[430px] object-contain drop-shadow-[0_18px_35px_rgba(79,57,246,0.14)]" src={heroImage} alt="" />
            </div>
          </div>
        </section>

        <section className="mt-2 bg-[linear-gradient(135deg,#6b3af7,#8927f8)] py-7 text-white">
          <div className="mx-auto grid max-w-[1200px] gap-7 px-5 md:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.label} className="text-center">
                <strong className={`block text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.05em] ${uiFont}`}>
                  {stat.value}
                </strong>
                <span className="mt-2 block text-white/80">{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="px-0 py-[88px]" id="products">
          <SectionHeader
            eyebrow="Premium Digital Tools"
            title="Premium Digital Tools"
            text="Explore a curated collection of digital products designed to help you work faster and create better results."
            titleClass="whitespace-nowrap max-w-none max-md:whitespace-normal max-md:max-w-[14ch]"
            showEyebrow={false}
          />

          <div className="mx-auto mt-7 flex max-w-[1200px] justify-center px-5">
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-[0_10px_25px_rgba(16,23,39,0.04)]">
              <button
                className={`rounded-full px-7 py-3.5 font-bold tracking-[-0.02em] transition ${uiFont} ${view === 'products'
                    ? 'bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7] text-white shadow-[0_14px_24px_rgba(79,57,246,0.24)]'
                    : 'bg-transparent text-[#101727]'
                  }`}
                type="button"
                onClick={() => setView('products')}
              >
                Products
              </button>
              <button
                className={`rounded-full px-7 py-3.5 font-bold tracking-[-0.02em] transition ${uiFont} ${view === 'cart'
                    ? 'bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7] text-white shadow-[0_14px_24px_rgba(79,57,246,0.24)]'
                    : 'bg-transparent text-[#101727]'
                  }`}
                type="button"
                onClick={() => setView('cart')}
              >
                Cart ({cartCount})
              </button>
            </div>
          </div>

          {view === 'products' ? (
            <div className="mx-auto mt-8 grid max-w-[1200px] gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const Icon = toolIcons[product.iconKey] || FiFeather
                const isAdded = addedIds.includes(product.id)

                const tagStyle =
                  product.tagType === 'new'
                    ? 'bg-emerald-50 text-emerald-600'
                    : product.tagType === 'best seller'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-[rgba(109,56,255,0.12)] text-[#6d38ff]'

                return (
                  <article key={product.id} className={`${cardShell} relative p-5`}>
                    <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[0.76rem] font-extrabold ${tagStyle} ${uiFont}`}>
                      {product.tag}
                    </div>

                    <div className="grid h-[52px] w-[52px] place-items-center rounded-[18px] bg-[rgba(109,56,255,0.10)] text-[#4f39f6]">
                      <Icon aria-hidden="true" />
                    </div>

                    <div className="mt-4">
                      <h3 className={`text-[1.2rem] font-semibold tracking-[-0.04em] text-[#101727] ${uiFont}`}>
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-7 text-slate-600">{product.description}</p>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <strong className={`text-[1.7rem] tracking-[-0.05em] text-[#101727] ${uiFont}`}>
                        ${product.price}
                      </strong>
                      <span className="text-slate-500">/{product.period}</span>
                    </div>

                    <span className={`mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-[0.8rem] font-bold text-slate-600 ${uiFont}`}>
                      {product.tagType}
                    </span>

                    <ul className="mt-4 grid gap-2.5">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="relative pl-6 leading-6 text-slate-600 before:absolute before:left-0 before:top-0 before:font-extrabold before:text-emerald-500 before:content-['✓']"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`mt-5 w-full rounded-full px-6 py-3.5 font-bold tracking-[-0.02em] text-white transition ${uiFont} ${isAdded
                          ? 'bg-gradient-to-r from-[#d946ef] to-[#8b5cf6]'
                          : 'bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7]'
                        }`}
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      {isAdded ? 'Added to Cart' : 'Buy Now'}
                    </button>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className={`${cardShell} mx-auto mt-8 max-w-[1200px] px-5 py-7 md:px-8 md:py-8`}>
              <div className="mb-5 flex items-start justify-between gap-5 max-md:flex-col">
                <div>
                  <h3 className={`text-[1.6rem] font-bold tracking-[-0.04em] text-[#101727] ${uiFont}`}>Your Cart</h3>
                  <p className="mt-2 text-slate-600">
                    {cart.length ? `${cart.length} selected product${cart.length > 1 ? 's' : ''}` : 'Your cart is empty right now.'}
                  </p>
                </div>
                <div className="text-right max-md:text-left">
                  <span className="mb-1 block text-slate-500">Total</span>
                  <strong className={`text-[2rem] tracking-[-0.05em] text-[#101727] ${uiFont}`}>
                    ${cartTotal}
                  </strong>
                </div>
              </div>

              {cart.length ? (
                <>
                  <div className="grid gap-3.5">
                    {cart.map((item) => {
                      const Icon = toolIcons[item.iconKey] || FiFeather

                      return (
                        <article
                          key={item.id}
                          className="grid items-center gap-4 rounded-[18px] border border-slate-200 bg-[#f8faff] p-4 md:grid-cols-[auto_1fr_auto]"
                        >
                          <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-white text-[#4f39f6] shadow-[inset_0_0_0_1px_rgba(16,23,39,0.06)]">
                            <Icon aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className={`text-[1.1rem] font-semibold tracking-[-0.04em] text-[#101727] ${uiFont}`}>
                              {item.name}
                            </h4>
                            <span className="mt-1.5 block text-slate-600">${item.price}</span>
                          </div>
                          <button
                            className="justify-start border-0 bg-transparent font-bold text-[#ff3f73] transition hover:opacity-80 md:justify-self-end"
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </article>
                      )
                    })}
                  </div>

                  <button className={`${primaryBtn} mt-6 w-full`} type="button" onClick={clearCart}>
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <div className="grid justify-items-center gap-4 py-6 text-center">
                  <p className="text-slate-600">No products have been added yet.</p>
                  <button className={primaryBtn} type="button" onClick={() => setView('products')}>
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="px-0 py-20" id="features">
          <SectionHeader
            eyebrow="How It Works"
            title="Get Started in 3 Steps"
            text="Pick your tools, add them to cart, and begin creating without a steep learning curve."
            wide
            showEyebrow={false}
          />

          <div className="mx-auto mt-8 grid max-w-[1200px] gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
            {stepCards.map((step) => {
              const Icon = step.Icon

              return (
                <article key={step.number} className={`${cardShell} relative p-7 text-center`}>
                  <span className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[rgba(109,56,255,0.10)] text-[0.76rem] font-extrabold text-[#4f39f6] ${uiFont}`}>
                    {step.number}
                  </span>
                  <div className="mx-auto mb-4 grid h-[82px] w-[82px] place-items-center rounded-full bg-[rgba(109,56,255,0.10)] text-[#4f39f6]">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className={`text-[1.15rem] font-semibold tracking-[-0.04em] text-[#101727] ${uiFont}`}>
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="px-0 py-20" id="pricing">
          <SectionHeader
            eyebrow="Pricing Plans"
            title="Simple, Transparent Pricing"
            text="Choose a plan that fits your work, your team, and your budget."
            titleClass="whitespace-nowrap max-w-none max-md:whitespace-normal"
            showEyebrow={false}
          />

          <div className="mx-auto mt-8 grid max-w-[1200px] gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-[24px] border border-slate-200 p-6 shadow-[0_14px_35px_rgba(16,23,39,0.05)] ${plan.featured ? 'bg-gradient-to-b from-[#6d38ff] to-[#8f2bf7] text-white -translate-y-2.5' : 'bg-white/95'
                  }`}
              >
                {plan.featured && (
                  <span className={`absolute right-5 top-4 rounded-full bg-[rgba(255,255,255,0.16)] px-3 py-1 text-[0.76rem] font-extrabold text-white ${uiFont}`}>
                    Most Popular
                  </span>
                )}
                <h3 className={`text-[1.15rem] font-semibold tracking-[-0.04em] ${uiFont} ${plan.featured ? 'text-white' : 'text-[#101727]'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 ${plan.featured ? 'text-white/82' : 'text-slate-600'}`}>{plan.subtitle}</p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <strong className={`text-[2.4rem] tracking-[-0.06em] ${uiFont} ${plan.featured ? 'text-white' : 'text-[#101727]'}`}>
                    {plan.price}
                  </strong>
                  <span className={plan.featured ? 'text-white/82' : 'text-slate-500'}>{plan.period}</span>
                </div>
                <ul className="mt-4 grid gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`relative pl-6 leading-6 before:absolute before:left-0 before:top-0 before:font-extrabold before:content-['✓'] ${plan.featured ? 'text-white/82 before:text-white' : 'text-slate-600 before:text-emerald-500'
                        }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full rounded-full px-6 py-3.5 font-bold tracking-[-0.02em] transition ${uiFont} ${plan.featured ? 'bg-white text-[#4f39f6]' : 'bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7] text-white'
                    }`}
                  type="button"
                >
                  {plan.button}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#6d38ff] to-[#8f2bf7] px-0 py-20 text-white" id="testimonials">
          <div className="mx-auto max-w-[1200px] px-5 text-center">
            <span className={`inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-sm font-bold tracking-[-0.02em] text-white ${uiFont}`}>
              Ready to transform your workflow?
            </span>
            <h2 className={`mx-auto mt-4 mb-3 max-w-[13ch] text-[clamp(2.2rem,5vw,4rem)] font-extrabold capitalize leading-[1.02] tracking-[-0.05em] ${uiFont}`}>
              Build Faster With Premium Digital Tools
            </h2>
            <p className="mx-auto max-w-[620px] leading-7 text-white/82">
              Join thousands of creators and teams who use DigiTools to save time and ship better work.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <a className={`rounded-full border border-white/35 bg-transparent px-6 py-3.5 font-bold tracking-[-0.02em] text-white transition hover:bg-white/10 ${uiFont}`} href="#products">
                Explore Products
              </a>
              <a className={`rounded-full bg-white px-6 py-3.5 font-bold tracking-[-0.02em] text-[#4f39f6] transition hover:bg-slate-100 ${uiFont}`} href="#pricing">
                View Pricing
              </a>
            </div>
          </div>
        </section>

        <section className="px-0 py-8" id="faq">
          <div className="mx-auto grid max-w-[1200px] gap-5 px-5 md:grid-cols-3">
            {faqCards.map((item) => (
              <article key={item.title} className={`${cardShell} p-6`}>
                <h3 className={`mb-2 text-[1.15rem] font-semibold tracking-[-0.04em] text-[#101727] ${uiFont}`}>
                  {item.title}
                </h3>
                <p className="leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#0f172a] px-0 py-14 text-[#dbe2f1]" id="footer">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a className="inline-flex items-center gap-3 text-inherit no-underline" href="#home">
              <img className="h-10 w-auto" src={logoImage} alt="DigiTools" />
            </a>
            <p className="mt-4 max-w-[320px] leading-7 text-[#dbe2f1]/80">
              Premium digital tools for creators, freelancers, and growing teams who want a modern buying experience.
            </p>
          </div>

          <div>
            <h4 className={`mb-3 font-semibold text-white ${uiFont}`}>Product</h4>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#products">
              Products
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#features">
              Features
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#pricing">
              Pricing
            </a>
          </div>

          <div>
            <h4 className={`mb-3 font-semibold text-white ${uiFont}`}>Company</h4>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#home">
              About
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#faq">
              FAQ
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#footer">
              Contact
            </a>
          </div>

          <div>
            <h4 className={`mb-3 font-semibold text-white ${uiFont}`}>Follow</h4>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#home">
              Facebook
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#home">
              LinkedIn
            </a>
            <a className="mt-2 block text-[#dbe2f1]/72 no-underline transition hover:text-white" href="#home">
              X
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-4 border-t border-white/10 px-5 pt-5 text-[#dbe2f1]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DigiTools. All rights reserved.</span>
          <div className="flex gap-4">
            <a className="no-underline transition hover:text-white" href="#home">
              Privacy
            </a>
            <a className="no-underline transition hover:text-white" href="#home">
              Terms
            </a>
            <a className="no-underline transition hover:text-white" href="#home">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

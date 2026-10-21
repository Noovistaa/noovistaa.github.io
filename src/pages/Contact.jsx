// The Contact page. Text lives in src/content/contact.js; email & form settings in src/content/site.js.
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Clock, Copy, Mail, MapPin, Phone, Plus } from 'lucide-react'
import { site } from '../content/site'
import { budgets, contactHeader, faq, projectTypes } from '../content/contact'
import Page from '../components/layout/Page'
import PageHeader from '../components/sections/PageHeader'
import Reveal from '../components/effects/Reveal'
import Magnetic from '../components/effects/Magnetic'

const empty = { name: '', email: '', company: '', types: [], budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const toggleType = (t) =>
    setForm((f) => ({ ...f, types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t] }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, types: form.types.join(', ') }

    // No form service configured: open the visitor's email app with everything filled in.
    if (!site.formEndpoint) {
      const lines = [`Name: ${payload.name}`, `Email: ${payload.email}`]
      if (payload.company) lines.push(`Company: ${payload.company}`)
      if (payload.types) lines.push(`Project type: ${payload.types}`)
      if (payload.budget) lines.push(`Budget: ${payload.budget}`)
      lines.push('', payload.message)
      const subject = encodeURIComponent(`Project inquiry from ${payload.name}`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Page title="Contact">
      <PageHeader {...contactHeader} />

      <section className="section section-flush-top">
        <div className="container contact-grid">
          <Reveal className="contact-form-card">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="success-icon">
                    <Check />
                  </span>
                  <h3>Thanks, {form.name.split(' ')[0] || 'friend'}!</h3>
                  <p className="muted">
                    {site.formEndpoint
                      ? 'Your message is on its way. We’ll get back to you within 24 hours.'
                      : 'Your email app should have opened with your message ready to send.'}
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setForm(empty)
                      setStatus('idle')
                    }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="contact-form" exit={{ opacity: 0 }}>
                  <div className="field-row">
                    <Field label="Your name" value={form.name} onChange={update('name')} required autoComplete="name" />
                    <Field label="Email" type="email" value={form.email} onChange={update('email')} required autoComplete="email" />
                  </div>
                  <Field label="Company (optional)" value={form.company} onChange={update('company')} autoComplete="organization" />

                  <fieldset className="chip-group">
                    <legend>What do you need?</legend>
                    {projectTypes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`chip ${form.types.includes(t) ? 'is-on' : ''}`}
                        onClick={() => toggleType(t)}
                        aria-pressed={form.types.includes(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </fieldset>

                  <fieldset className="chip-group">
                    <legend>Budget</legend>
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`chip ${form.budget === b ? 'is-on' : ''}`}
                        onClick={() => setForm((f) => ({ ...f, budget: f.budget === b ? '' : b }))}
                        aria-pressed={form.budget === b}
                      >
                        {b}
                      </button>
                    ))}
                  </fieldset>

                  <Field label="Tell us about your project" value={form.message} onChange={update('message')} required textarea />

                  {status === 'error' && <p className="form-error">Something went wrong. Please email us directly at {site.email}.</p>}

                  <Magnetic strength={0.25}>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight />
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <div className="contact-side">
            <Reveal delay={0.1} className="info-card">
              <span className="info-icon">
                <Mail size={18} />
              </span>
              <div>
                <span className="info-label">Email</span>
                <a href={`mailto:${site.email}`} className="info-value">
                  {site.email}
                </a>
              </div>
              <button className="icon-btn info-copy" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check /> : <Copy />}
              </button>
            </Reveal>
            {site.phone && (
              <Reveal delay={0.14} className="info-card">
                <span className="info-icon">
                  <Phone size={18} />
                </span>
                <div>
                  <span className="info-label">Phone</span>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="info-value">
                    {site.phone}
                  </a>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.18} className="info-card">
              <span className="info-icon">
                <MapPin size={18} />
              </span>
              <div>
                <span className="info-label">Office</span>
                {site.address && <span className="info-value">{site.address}</span>}
                <span className={site.address ? 'info-value muted' : 'info-value'}>{site.location}</span>
              </div>
            </Reveal>
            <Reveal delay={0.22} className="info-card">
              <span className="info-icon">
                <Clock size={18} />
              </span>
              <div>
                <span className="info-label">Response time</span>
                <span className="info-value">Within 24 hours</span>
              </div>
            </Reveal>
            <Reveal delay={0.26} className="contact-socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="tag">
                  {s.label} ↗
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2>Questions, answered</h2>
          </Reveal>
          <div className="faq-list">
            {faq.map((item, i) => {
              const open = openFaq === i
              return (
                <Reveal key={item.question} delay={i * 0.05} className={`faq-item ${open ? 'is-open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                    {item.question}
                    <span className="faq-icon">
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="faq-a-wrap"
                      >
                        <p className="faq-a muted">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </Page>
  )
}

// Text input with a label that floats up when you type.
function Field({ label, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="field">
      <Tag placeholder=" " rows={textarea ? 5 : undefined} {...props} />
      <span className="field-label">{label}</span>
    </label>
  )
}

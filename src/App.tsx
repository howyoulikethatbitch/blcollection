import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Flower2,
  Heart,
  Info,
  LibraryBig,
  Menu,
  Moon,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  Star,
  Sun,
  X,
} from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { allGenres, novels, type Novel } from './data/novels'

type Theme = 'light' | 'night'
type TextSize = 'small' | 'medium' | 'large'

const azureLogo = `${import.meta.env.BASE_URL}assets/azure-logo.jpg`
const azureBanner = `${import.meta.env.BASE_URL}assets/azure-bl-collection-banner.jpg`

const navItems = [
  { label: 'Home', to: '/', icon: Flower2 },
  { label: 'Featured', to: '/featured', icon: Sparkles },
  { label: 'Long novels', to: '/long', icon: BookOpen },
  { label: 'Short novels', to: '/short', icon: LibraryBig },
  { label: 'Genres', to: '/genres', icon: Star },
]

const readStorage = (key: string, fallback: string[] = []) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [favorites, setFavorites] = useState<string[]>(() => readStorage('azure-favorites'))
  const [history, setHistory] = useState<string[]>(() => readStorage('azure-history'))
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem('azure-theme') as Theme || 'light')
  const [textSize, setTextSize] = useState<TextSize>(() => localStorage.getItem('azure-text-size') as TextSize || 'medium')
  const [animations, setAnimations] = useState(() => localStorage.getItem('azure-animations') !== 'off')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => localStorage.setItem('azure-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => localStorage.setItem('azure-history', JSON.stringify(history)), [history])
  useEffect(() => {
    localStorage.setItem('azure-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    localStorage.setItem('azure-text-size', textSize)
    document.documentElement.dataset.textSize = textSize
  }, [textSize])
  useEffect(() => {
    localStorage.setItem('azure-animations', animations ? 'on' : 'off')
    document.documentElement.dataset.animations = animations ? 'on' : 'off'
  }, [animations])

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const openNovel = (novel: Novel) => {
    setHistory((current) => [novel.id, ...current.filter((id) => id !== novel.id)].slice(0, 10))
    if (novel.vnUrl) window.open(novel.vnUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`app-shell ${mobileOpen ? 'mobile-nav-open' : ''}`}>
      <Sidebar onClose={() => setMobileOpen(false)} />
      <main className="main-content">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <Routes>
          <Route path="/" element={<Home favorites={favorites} history={history} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="/featured" element={<CollectionPage title="Featured stories" eyebrow="Handpicked from the garden" description="A few stories the stars have placed gently in the spotlight." novels={novels.filter((novel) => novel.featured)} favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="/long" element={<CollectionPage title="Long novels" eyebrow="Twelve chapters to get lost in" description="Let the story unfold slowly, one chapter and one heartbeat at a time." novels={novels.filter((novel) => novel.type === 'long')} favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="/short" element={<CollectionPage title="Short novels" eyebrow="Eight chapters for one sitting" description="Small, tender stories for an afternoon, an evening, or whenever you need a little magic." novels={novels.filter((novel) => novel.type === 'short')} favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="/genres" element={<GenresPage favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="/favorites" element={<CollectionPage title="Your garden" eyebrow="Stories you are keeping close" description="Your saved stories live here, waiting whenever you are ready to return." novels={novels.filter((novel) => favorites.includes(novel.id))} favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} emptyTitle="No stories have found their way into your garden yet." />} />
          <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} textSize={textSize} setTextSize={setTextSize} animations={animations} setAnimations={setAnimations} clearFavorites={() => setFavorites([])} clearHistory={() => setHistory([])} reset={() => { setFavorites([]); setHistory([]); setTheme('light'); setTextSize('medium'); setAnimations(true) }} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/novel/:id" element={<NovelPage favorites={favorites} onFavorite={toggleFavorite} onRead={openNovel} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function Sidebar({ onClose }: { onClose: () => void }) {
  const location = useLocation()
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link to="/" className="brand-lockup" onClick={onClose}>
          <span className="brand-mark"><img src={azureLogo} alt="Azure Visual Novel Hub logo" /></span>
          <span><strong>AZURE</strong><small>BL COLLECTION</small></span>
        </Link>
        <button className="icon-button close-nav" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
      </div>
      <div className="sidebar-rule"><span>✦</span></div>
      <nav className="primary-nav" aria-label="Main navigation">
        <p className="nav-label">Explore</p>
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `nav-link ${isActive && (to === '/' ? location.pathname === '/' : true) ? 'active' : ''}`}>
            <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
          </NavLink>
        ))}
        <p className="nav-label nav-label-spaced">Your space</p>
        <NavLink to="/favorites" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Heart size={17} strokeWidth={1.8} /><span>Favorites</span></NavLink>
        <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><SettingsIcon size={17} strokeWidth={1.8} /><span>Settings</span></NavLink>
        <NavLink to="/about" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Info size={17} strokeWidth={1.8} /><span>About</span></NavLink>
      </nav>
      <div className="sidebar-footer">
        <div className="mini-orbit"><span>✦</span><i /><i /><i /></div>
        <p>Stories bloom here.</p>
        <small>v1.0 · made with moonlight</small>
      </div>
    </aside>
  )
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const location = useLocation()
  const titles: Record<string, string> = { '/': 'Home', '/featured': 'Featured', '/long': 'Long novels', '/short': 'Short novels', '/genres': 'Genres', '/favorites': 'Favorites', '/settings': 'Settings', '/about': 'About' }
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <div className="breadcrumb"><span>Azure</span><ChevronRight size={14} /><strong>{titles[location.pathname] || 'Story details'}</strong></div>
      <div className="topbar-note"><span className="status-dot" /> personal library</div>
    </header>
  )
}

function Home({ favorites, history, onFavorite, onRead }: CollectionProps & { history: string[] }) {
  const featured = novels.filter((novel) => novel.featured)
  const long = novels.filter((novel) => novel.type === 'long')
  const short = novels.filter((novel) => novel.type === 'short')
  const latest = novels.find((novel) => novel.id === history[0])
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A little library of big feelings</div>
          <h1>Stories<br /><em>bloom</em> here.</h1>
          <p className="hero-description">A dreamy garden for BL visual novels —<br className="desktop-only" /> discover a new world and stay awhile.</p>
          <div className="hero-actions">
            <Link to="/featured" className="button button-primary">Explore the garden <ArrowRight size={16} /></Link>
            <Link to="/about" className="button button-quiet">Our little story</Link>
          </div>
        </div>
          <HeroBanner />
        <div className="hero-sprig">✦</div>
      </section>
      {latest && <ContinueReading novel={latest} onRead={onRead} />}
      <CollectionRail title="Featured stories" subtitle="Handpicked from the garden" novels={featured} favorites={favorites} onFavorite={onFavorite} onRead={onRead} link="/featured" />
      <CollectionRail title="Long novels" subtitle="Twelve chapters to get lost in" novels={long} favorites={favorites} onFavorite={onFavorite} onRead={onRead} link="/long" />
      <CollectionRail title="Short novels" subtitle="Eight chapters for one sitting" novels={short} favorites={favorites} onFavorite={onFavorite} onRead={onRead} link="/short" />
      <footer className="page-footer"><span>Azure BL Collection</span><span>✦</span><span>Stories bloom here.</span></footer>
    </div>
  )
}

function HeroBanner() {
  return <figure className="hero-banner">
    <img src={azureBanner} alt="Azure BL Collection title over a glowing pixel-art night sky with flowers and floating islands" />
  </figure>
}

function ContinueReading({ novel, onRead }: { novel: Novel; onRead: (novel: Novel) => void }) {
  return <section className="continue-card">
    <div className="continue-icon"><BookOpen size={20} /></div>
    <div className="continue-copy"><span className="section-kicker">Continue your story</span><strong>{novel.title}</strong><span>Ready whenever you are · {novel.chapterCount} chapters</span></div>
    <button className="button button-small button-outline" onClick={() => onRead(novel)}>Open story <ArrowRight size={14} /></button>
  </section>
}

type CollectionProps = { favorites: string[]; onFavorite: (id: string) => void; onRead: (novel: Novel) => void }

function CollectionRail({ title, subtitle, novels: railNovels, favorites, onFavorite, onRead, link }: CollectionProps & { title: string; subtitle: string; novels: Novel[]; link?: string }) {
  return <section className="collection-section">
    <div className="section-heading"><div><span className="section-kicker">{subtitle}</span><h2>{title}</h2></div>{link && <Link to={link} className="text-link">View all <ArrowRight size={15} /></Link>}</div>
    <div className="novel-grid">{railNovels.map((novel) => <NovelCard key={novel.id} novel={novel} favorite={favorites.includes(novel.id)} onFavorite={onFavorite} onRead={onRead} />)}</div>
  </section>
}

function NovelCard({ novel, favorite, onFavorite, onRead }: { novel: Novel; favorite: boolean; onFavorite: (id: string) => void; onRead: (novel: Novel) => void }) {
  return <article className="novel-card">
    <Link to={`/novel/${novel.id}`} className="cover-wrap"><CoverArt novel={novel} /><span className="cover-shine" /></Link>
    <div className="card-body">
      <div className="card-title-row"><Link to={`/novel/${novel.id}`} className="card-title">{novel.title}</Link><button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(novel.id)} aria-label={favorite ? `Remove ${novel.title} from favorites` : `Add ${novel.title} to favorites`}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button></div>
      <p className="card-subtitle">{novel.subtitle}</p>
      <div className="card-meta"><span>{novel.genres[0]} · {novel.genres[1]}</span><span>{novel.chapterCount} chapters</span></div>
      <button className="read-button" onClick={() => onRead(novel)} disabled={!novel.vnUrl}>{novel.vnUrl ? 'Read story' : 'Coming soon'} {novel.vnUrl && <ArrowRight size={14} />}</button>
    </div>
  </article>
}

function CoverArt({ novel, large = false }: { novel: Novel; large?: boolean }) {
  return <div className={`cover-art cover-${novel.coverTheme} ${large ? 'cover-large' : ''}`} style={{ '--cover-accent': novel.accent } as CSSProperties}>
    <div className="cover-noise" /><span className="cover-star star-a">✦</span><span className="cover-star star-b">✧</span><span className="cover-moon" />
    <div className="cover-plant"><i /><i /><i /><i /></div><div className="cover-words"><small>AZURE BL</small><strong>{novel.title}</strong><em>{novel.subtitle}</em></div>
  </div>
}

function CollectionPage({ title, eyebrow, description, novels: pageNovels, emptyTitle = 'The garden is still growing...', ...props }: CollectionProps & { title: string; eyebrow: string; description: string; novels: Novel[]; emptyTitle?: string }) {
  const [query, setQuery] = useState('')
  const filtered = pageNovels.filter((novel) => `${novel.title} ${novel.genres.join(' ')} ${novel.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="page inner-page">
    <PageIntro eyebrow={eyebrow} title={title} description={description} />
    <div className="toolbar"><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories, genres, tropes..." aria-label="Search stories" /></div><span className="result-count">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</span></div>
    {filtered.length ? <div className="novel-grid novel-grid-wide">{filtered.map((novel) => <NovelCard key={novel.id} novel={novel} favorite={props.favorites.includes(novel.id)} {...props} />)}</div> : <EmptyState title={emptyTitle} body={query ? 'Try another title, genre, or trope.' : 'New stories will bloom here soon.'} />}
  </div>
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div><h1>{title}</h1></div><p>{description}</p></div>
}

function GenresPage({ favorites, onFavorite, onRead }: CollectionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const shown = selected ? novels.filter((novel) => novel.genres.includes(selected)) : []
  return <div className="page inner-page">
    <PageIntro eyebrow="Find your next world" title="Browse by feeling" description="Every story carries a different kind of magic. Follow the thread that catches your heart." />
    <div className="genre-grid">{allGenres.map((genre, index) => <button key={genre} className={`genre-pill genre-${index % 4} ${selected === genre ? 'selected' : ''}`} onClick={() => setSelected(selected === genre ? null : genre)}><span>{['✿', '✦', '☾', '✧'][index % 4]}</span>{genre}<small>{novels.filter((novel) => novel.genres.includes(genre)).length}</small></button>)}</div>
    {selected && <div className="genre-results"><div className="section-heading"><div><span className="section-kicker">Stories with a little {selected.toLowerCase()}</span><h2>{selected}</h2></div><button className="text-link button-reset" onClick={() => setSelected(null)}>Clear filter <X size={14} /></button></div><div className="novel-grid">{shown.map((novel) => <NovelCard key={novel.id} novel={novel} favorite={favorites.includes(novel.id)} onFavorite={onFavorite} onRead={onRead} />)}</div></div>}
    {!selected && <div className="genre-note"><Sparkles size={18} /><span>Select a genre to let the stories find you.</span></div>}
  </div>
}

function NovelPage({ favorites, onFavorite, onRead }: CollectionProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const novel = novels.find((item) => item.id === id)
  if (!novel) return <NotFound />
  return <div className="page inner-page">
    <button className="back-link" onClick={() => navigate(-1)}>← Back to the garden</button>
    <div className="novel-detail">
      <div className="detail-cover"><CoverArt novel={novel} large /></div>
      <div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> {novel.status} · {novel.type === 'long' ? 'Long novel' : 'Short novel'}</div><h1>{novel.title}</h1><p className="detail-subtitle">{novel.subtitle}</p><p className="detail-description">{novel.description}</p><div className="tag-list">{novel.genres.concat(novel.tags).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="detail-actions"><button className="button button-primary" onClick={() => onRead(novel)} disabled={!novel.vnUrl}>{novel.vnUrl ? 'Read story' : 'Coming soon'} {novel.vnUrl && <ArrowRight size={16} />}</button><button className={`button button-outline ${favorites.includes(novel.id) ? 'selected-button' : ''}`} onClick={() => onFavorite(novel.id)}><Heart size={16} fill={favorites.includes(novel.id) ? 'currentColor' : 'none'} /> {favorites.includes(novel.id) ? 'In your garden' : 'Save story'}</button></div><div className="detail-facts"><span><strong>{novel.chapterCount}</strong> chapters</span><span><strong>{novel.genres.length}</strong> genres</span><span><strong>0</strong> explicit content</span></div></div>
    </div>
  </div>
}

function SettingsPage({ theme, setTheme, textSize, setTextSize, animations, setAnimations, clearFavorites, clearHistory, reset }: { theme: Theme; setTheme: (value: Theme) => void; textSize: TextSize; setTextSize: (value: TextSize) => void; animations: boolean; setAnimations: (value: boolean) => void; clearFavorites: () => void; clearHistory: () => void; reset: () => void }) {
  return <div className="page inner-page narrow-page"><PageIntro eyebrow="Make it yours" title="Settings" description="A few gentle controls for making your library feel at home." /><div className="settings-list">
    <SettingGroup title="Appearance" icon={<Sun size={18} />}><div className="segmented"><button className={theme === 'light' ? 'selected' : ''} onClick={() => setTheme('light')}><Sun size={16} /> Azure light</button><button className={theme === 'night' ? 'selected' : ''} onClick={() => setTheme('night')}><Moon size={16} /> Azure night</button></div></SettingGroup>
    <SettingGroup title="Reading comfort" icon={<BookOpen size={18} />}><div className="setting-row"><span><strong>Text size</strong><small>Adjust the words to your perfect size.</small></span><div className="text-size-options">{(['small', 'medium', 'large'] as TextSize[]).map((size) => <button key={size} className={textSize === size ? 'selected' : ''} onClick={() => setTextSize(size)}>{size[0].toUpperCase() + size.slice(1)}</button>)}</div></div><div className="setting-row"><span><strong>Little animations</strong><small>Let petals and stars gently move around you.</small></span><button className={`toggle ${animations ? 'on' : ''}`} onClick={() => setAnimations(!animations)} aria-label="Toggle animations"><span /></button></div></SettingGroup>
    <SettingGroup title="Library" icon={<Heart size={18} />}><div className="action-row"><button onClick={clearFavorites}>Clear favorites</button><button onClick={clearHistory}>Clear reading history</button><button className="danger-action" onClick={reset}>Reset local data</button></div></SettingGroup>
  </div></div>
}

function SettingGroup({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) { return <section className="setting-group"><div className="setting-heading">{icon}<h2>{title}</h2></div>{children}</section> }

function AboutPage() {
  return <div className="page inner-page about-page"><PageIntro eyebrow="A small note from the garden" title="About Azure" description="A personal garden of BL visual novels, where every story is a little world waiting to bloom." /><div className="about-grid"><div className="about-card about-card-feature"><span className="big-sparkle">✦</span><h2>Made for stories<br />that linger.</h2><p>Azure is a quiet place to collect, discover, and return to independently hosted visual novels. The collection is the library — each story opens in its own little world.</p></div><div className="about-facts"><div><strong>01</strong><span>Stories live in their own homes.<small>Read buttons open each visual novel in a new tab.</small></span></div><div><strong>02</strong><span>Your garden is private.<small>Favorites and history stay in this browser.</small></span></div><div><strong>03</strong><span>No rush, no noise.<small>No accounts, audio, or algorithms — just stories.</small></span></div></div></div></div>
}

function EmptyState({ title, body }: { title: string; body: string }) { return <div className="empty-state"><div className="empty-flower">✿</div><h2>{title}</h2><p>{body}</p></div> }
function NotFound() { return <div className="page inner-page"><EmptyState title="This path has not bloomed yet." body="Let's wander back to the garden." /><Link to="/" className="button button-primary centered-button">Return home <ArrowRight size={16} /></Link></div> }

export default App
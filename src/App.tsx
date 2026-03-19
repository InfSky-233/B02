import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PageTransition } from '@/components/PageTransition'
import { useTheme } from '@/hooks/useTheme'
import { Home } from '@/pages/Home'
import { ArticleDetail } from '@/pages/ArticleDetail'
import { About } from '@/pages/About'
import { Categories } from '@/pages/Categories'

function AppContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<ArticleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import InitialLoader from './components/InitialLoader';
import FloatingMobileDock from './components/FloatingMobileDock';
import LoadingSpinner from './components/LoadingSpinner';
import {
  useGetProfileQuery,
  useGetFeaturedProjectsQuery,
  useGetCoreSkillsQuery
} from './features/api/apiSlice';

// Lazy-loaded Pages for bundle optimization
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Certifications = React.lazy(() => import('./pages/Certifications'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Admin = React.lazy(() => import('./pages/Admin'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { data: profile, isLoading: isProfileLoading, isFetching: isProfileFetching } = useGetProfileQuery();
  const { isLoading: isProjectsLoading, isFetching: isProjectsFetching } = useGetFeaturedProjectsQuery();
  const { isLoading: isSkillsLoading, isFetching: isSkillsFetching } = useGetCoreSkillsQuery();

  const [minTimerPassed, setMinTimerPassed] = useState(false);
  const [maxTimerPassed, setMaxTimerPassed] = useState(false);

  const profileData = profile?.data || profile;

  useEffect(() => {
    // Minimum landing animation duration (1.2s)
    const minTimer = setTimeout(() => {
      setMinTimerPassed(true);
    }, 1200);

    // Maximum fallback safety timeout (8.0s) in case API connection is slow
    const maxTimer = setTimeout(() => {
      setMaxTimerPassed(true);
    }, 8000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  const isDataLoading =
    !maxTimerPassed &&
    (!minTimerPassed ||
      isProfileLoading ||
      isProjectsLoading ||
      isSkillsLoading ||
      isProfileFetching ||
      isProjectsFetching ||
      isSkillsFetching);

  return (
    <HelmetProvider>
      <Router>
        <div className="App min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-50/30">
          {/* First Time Landing Splash Loader */}
          <AnimatePresence>
            {isDataLoading && (
              <InitialLoader
                name={profileData?.name || 'Bishal Kumar Shaw'}
                isDataLoading={
                  !maxTimerPassed &&
                  (isProfileLoading ||
                    isProjectsLoading ||
                    isSkillsLoading ||
                    isProfileFetching ||
                    isProjectsFetching ||
                    isSkillsFetching)
                }
              />
            )}
          </AnimatePresence>

          <Navbar />
          <FloatingMobileDock />
          
          <main className="flex-grow min-h-[calc(100vh-320px)]">
            <ScrollToTop />
            <React.Suspense fallback={<LoadingSpinner message="Loading..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </main>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff'
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4ade80',
                  secondary: '#000'
                }
              },
              error: {
                duration: 4000,
                theme: {
                  primary: '#ef4444',
                  secondary: '#fff'
                }
              }
            }}
          />
          <Analytics />
          <SpeedInsights />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

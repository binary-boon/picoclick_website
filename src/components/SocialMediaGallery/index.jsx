'use client';

import { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import styles from './index.module.css';

const YOUTUBE_API_KEY = 'AIzaSyCX2ri19OOXHn-6zdn3yY_CFySDzAw7G8s';
const CHANNEL_NAME = '@picoclick2065';

const fetchChannelId = async (channelName) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=${encodeURIComponent(channelName)}&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items?.[0]?.id?.channelId;
};

const fetchVideos = async (channelId) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items;
};

export default function Socialmediagallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instagramPosts] = useState([
    'https://www.instagram.com/p/Coj6nNbAAC5/',
    'https://www.instagram.com/p/CqTEf6eIL5M/',
    'https://www.instagram.com/p/DIRNBzZoUCc/',
    'https://www.instagram.com/p/DMxk_QdI5Du/',
    'https://www.instagram.com/p/DKKBz6EoxL1/',
    'https://www.instagram.com/p/DJWkPPMozx1/'
  ]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const channelId = await fetchChannelId(CHANNEL_NAME);
        if (!channelId) {
          throw new Error('Channel not found');
        }
        const videoData = await fetchVideos(channelId);
        setVideos(videoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Social Gallery</h1>
          <p className={styles.heroSubtitle}>
            Experience our journey through stunning moments captured on Instagram and cinematic stories on YouTube
          </p>
        </div>
      </section>

      {/* Instagram Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Instagram</span>
            <h2 className={styles.sectionTitle}>Moments in Frames</h2>
            <p className={styles.sectionDescription}>
              Follow us for daily inspiration and behind-the-scenes glimpses
            </p>
            <a 
              href="https://www.instagram.com/picoclick/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.usernameLink}
            >
              @picoclick
            </a>
          </div>

          <div className={styles.instagramGrid}>
            {instagramPosts.map((postUrl, index) => (
              <div key={index} className={styles.instagramPost}>
                <InstagramEmbed url={postUrl} width="100%" />
              </div>
            ))}
          </div>

          <div className={styles.buttonWrapper}>
            <a 
              href="https://www.instagram.com/picoclick/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* YouTube Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>YouTube</span>
            <h2 className={styles.sectionTitle}>Stories in Motion</h2>
            <p className={styles.sectionDescription}>
              Step into the world we create – a blend of artistry, emotion, and storytelling
            </p>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading videos...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p>Unable to load videos. Please try again later.</p>
            </div>
          ) : (
            <div className={styles.youtubeGrid}>
              {videos.map((video) => (
                <div key={video.id.videoId} className={styles.videoCard}>
                  <div className={styles.videoWrapper}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.videoIframe}
                    ></iframe>
                  </div>
                  <div className={styles.videoInfo}>
                    <h3 className={styles.videoTitle}>{video.snippet.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.buttonWrapper}>
            <a 
              href="https://www.youtube.com/@picoclick2065" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.container}>
          <h2 className={styles.footerCtaTitle}>Let's Create Magic Together</h2>
          <p className={styles.footerCtaText}>
            Ready to tell your story? Get in touch and let's craft something extraordinary.
          </p>
          <a href="/contact" className={styles.ctaButtonPrimary}>
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
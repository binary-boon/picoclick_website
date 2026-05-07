import { Project } from '@/components/ScrollCards/ScrollCardsContainer'

export const projects: Project[] = [
  {
    title: 'Drone',
    description:
      'Our cinematic drone shots capture grand venues, vibrant rituals, and breathtaking landscapes from above. Perfect for destination weddings, outdoor ceremonies, and luxury celebrations, drone footage adds scale, drama, and a cinematic edge to your wedding film.',
    src: '/images/drone.jpg',
    link: '/gallery/drone',
    slug: 'drone',
    color: '#3F0D12',
    type: 'video',
    // Replace each placeholder with your actual Mux playback ID
    videoPlaybackIds: [
      'BFOJZBDUkJ6DuSWrWbRJMt9Ax3ryK6FWkDOBV7Cf7Rg',
      'quvUIynL00zXCqNdD14Lsw9IK01galPNVEQ4VFxcdTCBY',
      'OaakSwn66LFtoA93OkpOcnePyUog801A4cVo01d02amYD4',
      'c5rnbxK756F5Z6anKBRI5f1p5JLHEeJZ1x1Zw1wfDps',
      'IUK00wSm6K4wnJIAyrjMkz1DCLA4CPftBlnya1YNUhM4',
      'yVZ6Qw8LCd3sWueDk5J9ftZuKaAbTeHf02iHq5S01eTXg',
      'UFWpjSm1jHc8zfZ6DXFJ00BvEShWC7pI029Os02mjYkf58',
      'L601Wbl9BCuchR01CgnfrwDw9uGWsNs9lq16LK8b4k01KY',
    ],
  },
  {
    title: 'Pre-Wedding',
    description:
      'Pre-wedding shoots are all about chemistry, comfort, and connection. We create relaxed, story-driven sessions that reflect your personalities\u2014whether it\u2019s a romantic sunrise shoot, an adventurous escape, or an intimate, candid setting.',
    src: '/images/prewedding.jpg',
    link: '/gallery/pre-wedding',
    slug: 'pre-wedding',
    color: '#A71D31',
    type: 'image',
    galleryImages: Array.from({ length: 23 }, (_, i) => `/images/prewed-${i + 1}.jpg`),
  },
  {
    title: 'Wedding',
    description:
      'From sacred rituals and vibrant ceremonies to candid, unscripted moments\u2014we document your wedding day in all its beauty, chaos, and emotion so every detail lives on forever.',
    src: '/images/wedding-1.jpg',
    link: '/gallery/wedding',
    slug: 'wedding',
    color: '#8D775F',
    type: 'image',
    galleryImages: Array.from({ length: 29 }, (_, i) => `/images/wedding-${i + 1}.jpg`),
  },
  {
    title: 'Bridal',
    description:
      'Bridal photography focuses on capturing the beauty, confidence, and emotions of the bride\u2014from detailed attire and jewelry to quiet, powerful moments before the ceremony. Each portrait is styled to feel graceful, timeless, and deeply personal.',
    src: '/images/bridal.jpg',
    link: '/gallery/bridal',
    slug: 'bridal',
    color: '#D5BF86',
    type: 'image',
    galleryImages: Array.from({ length: 25 }, (_, i) => `/images/bridal-${i + 1}.jpg`),
  },
]

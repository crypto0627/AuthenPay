import {
  people01,
  people02,
  github,
  send,
  shield,
  star,
  userFriendly
} from '../assets'

export const navLinks = [
  {
    id: 'Home',
    title: 'Home'
  },
  {
    id: 'Github',
    title: 'Github'
  },
  {
    id: 'Launch App',
    title: 'Launch App'
  }
]

export const features = [
  {
    id: 'feature-1',
    icon: shield,
    title: 'Cross-chain transfers supported by USDC',
    content:
      'Easily send and receive USDC via QR code and securely cross-chain transfer USDC between supported blockchains using Circle CCTP V2, ensuring secure asset transfers.'
  },
  {
    id: 'feature-2',
    icon: star,
    title: 'Multi-Chain Support',
    content: 'Easily manage USDC balances between Base, Ethereum, and Avalanche with real-time tracking.'
  },
  {
    id: 'feature-3',
    icon: send,
    title: 'On-Chain Transaction Tracking',
    content: 'Use 1inch API to track historical transactions, making it as easy for users to operate as using Web2 app.'
  },
  {
    id: 'feature-4',
    icon: userFriendly,
    title: 'Seamless web3 payment experience',
    content: 'Provide wallet-free USDC transactions through EIP-4337. Combined with WebSocket listening and 1inch API tracking, it creates a smooth and secure Web3 payment experience.'
  }
]

export const teams = [
  {
    id: 'team-1',
    content: '',
    name: 'Solo Lin',
    title: 'Fullstack Developer',
    img: people01
  },
  {
    id: 'team-2',
    content: '',
    name: 'Jake Kuo',
    title: 'Fullstack Developer',
    img: people02
  }
]

export const stats = [
  {
    id: 'stats-1',
    title: 'User Active',
    value: '3800+'
  },
  {
    id: 'stats-2',
    title: 'Trusted by Company',
    value: '230+'
  },
  {
    id: 'stats-3',
    title: 'Transaction',
    value: '$230M+'
  }
]

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.hoobank.com/content/'
      },
      {
        name: 'How it Works',
        link: 'https://www.hoobank.com/how-it-works/'
      },
      {
        name: 'Create',
        link: 'https://www.hoobank.com/create/'
      },
      {
        name: 'Explore',
        link: 'https://www.hoobank.com/explore/'
      },
      {
        name: 'Terms & Services',
        link: 'https://www.hoobank.com/terms-and-services/'
      }
    ]
  },
  {
    title: 'Community',
    links: [
      {
        name: 'Help Center',
        link: 'https://www.hoobank.com/help-center/'
      },
      {
        name: 'Partners',
        link: 'https://www.hoobank.com/partners/'
      },
      {
        name: 'Suggestions',
        link: 'https://www.hoobank.com/suggestions/'
      },
      {
        name: 'Blog',
        link: 'https://www.hoobank.com/blog/'
      },
      {
        name: 'Newsletters',
        link: 'https://www.hoobank.com/newsletters/'
      }
    ]
  },
  {
    title: 'Partner',
    links: [
      {
        name: 'Our Partner',
        link: 'https://www.hoobank.com/our-partner/'
      },
      {
        name: 'Become a Partner',
        link: 'https://www.hoobank.com/become-a-partner/'
      }
    ]
  }
]

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: github,
    link: 'https://github.com/hollow-leaf/psyduck'
  }
]

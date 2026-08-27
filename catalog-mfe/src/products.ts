import type { Product } from '@mfe/shared'
import auroraImage from './assets/aurora.svg'
import atlasImage from './assets/atlas.svg'
import emberImage from './assets/ember.svg'
import haloImage from './assets/halo.svg'
import lumenImage from './assets/lumen.svg'
import orbitImage from './assets/orbit.svg'
import pulseImage from './assets/pulse.svg'
import terraImage from './assets/terra.svg'

export const products: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Headphones',
    price: 149.99,
    image: auroraImage,
    description:
      'Immersive over-ear headphones with adaptive noise control and a comfortable 30-hour battery.',
  },
  {
    id: 'atlas-backpack',
    name: 'Atlas Backpack',
    price: 89,
    image: atlasImage,
    description:
      'A weather-ready everyday pack with a padded laptop sleeve and modular interior storage.',
  },
  {
    id: 'ember-mug',
    name: 'Ember Travel Mug',
    price: 34.5,
    image: emberImage,
    description:
      'Double-wall insulated stainless steel keeps drinks at the right temperature on the move.',
  },
  {
    id: 'halo-lamp',
    name: 'Halo Desk Lamp',
    price: 72,
    image: haloImage,
    description:
      'A dimmable LED task lamp with warm-to-cool light and a compact wireless charging base.',
  },
  {
    id: 'lumen-keyboard',
    name: 'Lumen Keyboard',
    price: 119.95,
    image: lumenImage,
    description:
      'Low-profile mechanical keys, quiet tactile switches, and multi-device wireless pairing.',
  },
  {
    id: 'orbit-speaker',
    name: 'Orbit Speaker',
    price: 64.99,
    image: orbitImage,
    description:
      'A portable room-filling speaker with balanced sound, USB-C charging, and splash resistance.',
  },
  {
    id: 'pulse-watch',
    name: 'Pulse Fitness Watch',
    price: 199,
    image: pulseImage,
    description:
      'Track workouts, sleep, and heart rate on a bright always-on display with seven-day battery life.',
  },
  {
    id: 'terra-planter',
    name: 'Terra Smart Planter',
    price: 54.25,
    image: terraImage,
    description:
      'A self-watering ceramic planter with a simple moisture indicator for healthier indoor plants.',
  },
]

export const findProduct = (productId: string | null) =>
  products.find((product) => product.id === productId)

import ActionFigureImage from '../assets/action-figure.png';
import ActionFigureBanner from '../assets/action-figure-2.png';
import RunImage from '../assets/logo-run.png';
import GameImage from '../assets/logo-game.png'; 
import FashionImage from '../assets/logo-fashion.png'; 
import { HiOutlineShoppingBag } from 'react-icons/hi2';


export const categories = [
    { 
        name: 'Action Figure', 
        slug: 'action-figure', 
        type: 'image', 
        value: ActionFigureImage,
        heroImage: ActionFigureBanner
    },
    { 
        name: 'Sport', 
        slug: 'sport', 
        type: 'image', 
        value: RunImage,
        heroImage: RunImage 
    },
    { 
        name: 'Games & Puzzles', 
        slug: 'games-puzzles', 
        type: 'image', 
        value: GameImage,
        heroImage: GameImage
        },
    {
        name: 'Clothes & Footwear', 
        slug: 'clothes-footwear', 
        type: 'image', 
        value: FashionImage,
        heroImage: FashionImage
    },
    { 
        name: 'Coming Soon 1', 
        slug: 'coming-soon-1', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 2', 
        slug: 'coming-soon-2', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 3', 
        slug: 'coming-soon-3', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 4', 
        slug: 'coming-soon-5', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 6', 
        slug: 'coming-soon-6', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 7', 
        slug: 'coming-soon-7', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    { 
        name: 'Coming Soon 8', 
        slug: 'coming-soon-8', 
        type: 'icon', 
        value: HiOutlineShoppingBag,
        heroImage: 'https://placehold.co/600x400/cccccc/374151?text=Coming+Soon'
    },
    
];

export const getCategoryBySlug = (slug) => {
    return categories.find(category => category.slug === slug);
};
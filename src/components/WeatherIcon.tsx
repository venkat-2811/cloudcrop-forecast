
import React from 'react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  iconCode: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const iconSizeMap = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

// Map OpenWeather icon codes to paths and gradients
const getWeatherDetails = (iconCode: string) => {
  const codeMap: Record<string, { icon: JSX.Element, gradientClass: string }> = {
    '01d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ), 
      gradientClass: 'sunny-gradient'
    },
    '01n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C12.0885 2.75 12.1768 2.75136 12.2649 2.75405L12.3107 1.25517C12.2072 1.25173 12.1037 1.25 12 1.25V2.75ZM21.7092 12.2447C21.9525 11.8499 22.0641 11.364 21.9664 10.8359C21.8672 10.2988 21.5379 9.85542 21.0788 9.60258C20.6197 9.34975 20.0358 9.33317 19.5458 9.60309C19.0654 9.86548 18.7362 10.3511 18.6805 10.911L20.172 11.0683C20.1767 10.9796 20.2154 10.9076 20.2781 10.8618C20.3348 10.8198 20.4049 10.804 20.4643 10.8322C20.5237 10.8603 20.5598 10.9127 20.5747 10.9784C20.5901 11.0468 20.5699 11.1142 20.4253 11.469L21.7092 12.2447ZM12.2649 2.75405C12.8248 2.76973 13.1724 2.76764 13.4213 2.69485C13.6955 2.61435 13.7458 2.49848 13.7651 2.43964C13.7844 2.38081 13.8091 2.24101 13.7018 1.98863C13.6068 1.76527 13.4014 1.43373 12.9126 1.10149L12.1652 2.39073C12.1491 2.38038 12.1405 2.37543 12.1452 2.38218C12.1454 2.38234 12.1362 2.37472 12.1085 2.36233C12.0821 2.35054 12.0493 2.34075 12.0068 2.33718C11.9607 2.33328 11.891 2.33434 11.7506 2.33208C11.6451 2.33035 11.5037 2.32635 11.3106 2.31567L11.2524 3.8128C11.4283 3.82268 11.5508 3.82613 11.6407 3.82761C11.7369 3.82918 11.7818 3.82953 11.8064 3.82965C11.8326 3.82977 11.821 3.8292 11.8175 3.8289C11.8111 3.82835 11.8386 3.83472 11.8962 3.86244C11.9577 3.89272 12.0322 3.94643 12.1203 4.0153C12.2901 4.14845 12.4453 4.31686 12.5653 4.48497C12.6998 4.67348 12.7631 4.82883 12.7958 4.91906C12.829 5.01026 12.828 5.05111 12.828 5.055L14.328 5.05206C14.3279 4.58907 14.1819 4.14342 13.9346 3.7339C13.6678 3.29414 13.3004 2.94358 12.8599 2.71332C12.4587 2.50226 12.1168 2.46901 12.3107 1.25517L12.2649 2.75405ZM12.9126 1.10149C12.6957 0.956576 12.4533 0.866729 12.2043 0.835992C11.9509 0.804469 11.7129 0.839526 11.5156 0.946256C11.3195 1.05192 11.1842 1.2183 11.1095 1.44177C11.0314 1.67461 11.0664 1.95429 11.2524 2.31567L12.6518 1.75517C12.6533 1.76495 12.6449 1.75271 12.6395 1.7232C12.6348 1.69831 12.6397 1.68577 12.6418 1.68187C12.644 1.67786 12.6449 1.67829 12.6419 1.6796C12.6404 1.68027 12.6189 1.69285 12.5649 1.70361C12.5164 1.71321 12.4911 1.70611 12.5 1.71L12.9126 1.10149ZM18.6805 10.911C18.6189 11.5421 18.763 12.1333 19.0533 12.6008C19.3571 13.0926 19.8255 13.4149 20.3472 13.5153C20.8843 13.6186 21.4368 13.4706 21.8902 13.0695C22.352 12.6609 22.6715 12.033 22.674 11.2591L21.174 11.2539C21.1734 11.4347 21.103 11.5236 21.0315 11.5874C20.9516 11.6588 20.8599 11.6964 20.7715 11.6817C20.6777 11.6662 20.5887 11.6134 20.5238 11.4991C20.4608 11.3883 20.4309 11.2449 20.4465 11.0683L18.6805 10.911ZM22.674 11.2591C22.6789 9.79037 21.5368 8.64305 20.0685 8.64305V10.143C20.6913 10.143 21.1799 10.6358 21.174 11.2539L22.674 11.2591ZM12.2217 4.00092C11.0613 4.00092 10.1176 4.94461 10.1176 6.10505H11.6176C11.6176 5.77318 11.8898 5.50092 12.2217 5.50092V4.00092ZM10.1176 6.10505C10.1176 7.26549 11.0613 8.20918 12.2217 8.20918V6.70918C11.8898 6.70918 11.6176 6.43692 11.6176 6.10505H10.1176Z" fill="currentColor"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-indigo-400 to-purple-600 dark:from-indigo-600 dark:to-purple-800'
    },
    '02d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 5.63604L17.6562 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 18.364L17.6562 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 21V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.63596 18.364L6.34307 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.63596 5.63604L6.34307 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="currentColor"/>
          <path d="M10 20C5.85786 20 3 17.1421 3 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'cloudy-gradient'
    },
    '02n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C12.0885 2.75 12.1768 2.75136 12.2649 2.75405L12.3107 1.25517C12.2072 1.25173 12.1037 1.25 12 1.25V2.75Z" fill="currentColor"/>
          <path d="M10 20C5.85786 20 3 17.1421 3 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800'
    },
    '03d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15C2 11.6863 4.68629 9 8 9H16C19.3137 9 22 11.6863 22 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 9.5C5.5 5.91015 8.41015 3 12 3C15.5899 3 18.5 5.91015 18.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'cloudy-gradient'
    },
    '03n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15C2 11.6863 4.68629 9 8 9H16C19.3137 9 22 11.6863 22 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 9.5C5.5 5.91015 8.41015 3 12 3C15.5899 3 18.5 5.91015 18.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800'
    },
    '04d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9999 3H12.0099" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3599 5.64001L18.3699 5.65001" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12H21.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3599 18.36L18.3699 18.37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9999 21H12.0099" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.63989 18.36L5.64989 18.37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.99988 12H3.00988" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.63989 5.64001L5.64989 5.65001" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'cloudy-gradient'
    },
    '04n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9999 3H12.0099" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3599 5.64001L18.3699 5.65001" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12H21.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3599 18.36L18.3699 18.37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9999 21H12.0099" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.63989 18.36L5.64989 18.37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.99988 12H3.00988" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.63989 5.64001L5.64989 5.65001" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800'
    },
    '09d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 13C22 16.3137 19.3137 19 16 19H8C4.68629 19 2 16.3137 2 13C2 9.68629 4.68629 7 8 7H16C19.3137 7 22 9.68629 22 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 19L6 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 19L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'rainy-gradient'
    },
    '09n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 13C22 16.3137 19.3137 19 16 19H8C4.68629 19 2 16.3137 2 13C2 9.68629 4.68629 7 8 7H16C19.3137 7 22 9.68629 22 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 19L6 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 19L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'rainy-gradient'
    },
    '10d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 5.63604L17.6562 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 18.364L17.6562 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 21V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.63596 18.364L6.34307 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.63596 5.63604L6.34307 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z" fill="currentColor"/>
          <path d="M7.5 15.5L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 15.5L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14.5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'rainy-gradient'
    },
    '10n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C12.0885 2.75 12.1768 2.75136 12.2649 2.75405L12.3107 1.25517C12.2072 1.25173 12.1037 1.25 12 1.25V2.75Z" fill="currentColor"/>
          <path d="M7.5 15.5L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 15.5L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14.5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'rainy-gradient'
    },
    '11d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 16.7273C21.3304 15.8304 23 13.5791 23 11C23 7.68629 20.3137 5 17 5C16.6884 5 16.3824 5.02511 16.0832 5.07385C14.928 2.56271 12.3821 1 9.5 1C5.35786 1 2 4.35786 2 8.5C2 10.5361 2.82627 12.3658 4.16168 13.7083C4.05536 14.0926 4 14.4981 4 14.9167C4 17.7226 6.27741 20 9.08333 20H19V16.7273Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 14L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 20L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'thunder-gradient'
    },
    '11n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 16.7273C21.3304 15.8304 23 13.5791 23 11C23 7.68629 20.3137 5 17 5C16.6884 5 16.3824 5.02511 16.0832 5.07385C14.928 2.56271 12.3821 1 9.5 1C5.35786 1 2 4.35786 2 8.5C2 10.5361 2.82627 12.3658 4.16168 13.7083C4.05536 14.0926 4 14.4981 4 14.9167C4 17.7226 6.27741 20 9.08333 20H19V16.7273Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 14L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 20L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      gradientClass: 'thunder-gradient'
    },
    '13d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 5.63604L16.242 7.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.75724 16.2427L5.63593 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.364 18.364L16.2427 16.2427" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.75724 7.75743L5.63593 5.6361" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
        </svg>
      ), 
      gradientClass: 'snowy-gradient'
    },
    '13n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.3633 5.63604L16.242 7.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.75724 16.2427L5.63593 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18.364 18.364L16.2427 16.2427" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7.75724 7.75743L5.63593 5.6361" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
        </svg>
      ), 
      gradientClass: 'snowy-gradient'
    },
    '50d': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 17H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600'
    },
    '50n': { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 17H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ), 
      gradientClass: 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600'
    },
  };

  // Default backup icon if code not found
  const defaultIcon = {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    gradientClass: 'weather-gradient'
  };

  return codeMap[iconCode] || defaultIcon;
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  description,
  className,
  size = 'md',
}) => {
  const { icon, gradientClass } = getWeatherDetails(iconCode);
  
  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center p-2 text-white",
        gradientClass,
        iconSizeMap[size],
        className
      )}
      title={description}
    >
      {icon}
    </div>
  );
};

export default WeatherIcon;

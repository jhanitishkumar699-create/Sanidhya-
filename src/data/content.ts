import { MeaningCard, Memory, PromiseItem } from '../types';

export const MEANING_CARDS: MeaningCard[] = [
  {
    id: 'peace',
    title: 'My Peace',
    emoji: '🫶',
    subtitle: 'Mera Sukoon',
    description:
      'Jab duniya me shor hota hai, toh tumhare paas aakar dil ko sukoon milta hai. Kal raat maine wahi sukoon tod diya, aur is baat ka mujhe sabse zyada dukh hai.',
    quote: 'In your silence and your warmth, I found my only true calm.',
  },
  {
    id: 'happiness',
    title: 'My Happiness',
    emoji: '❤️',
    subtitle: 'Meri Khushi',
    description:
      'Tumhari ek smile mere poore din ki thakaan mita deti hai. Tumhe haste dekhna meri sabse badi khushi hai, aur meri wajah se tumhari aankhon me dard aana meri sabse badi haar.',
    quote: 'Your laughter is the sweetest sound in my universe.',
  },
  {
    id: 'favorite-person',
    title: 'My Favorite Person',
    emoji: '🥹',
    subtitle: 'Sabse Khaas',
    description:
      'Din me chahe kitne bhi log milein, meri har baat, har khushi aur har pareshani sirf tumhare saath share karne ka dil karta hai. You are my best friend first.',
    quote: 'Out of eight billion people, it is only you I run to.',
  },
  {
    id: 'home',
    title: 'My Home',
    emoji: '🏠',
    subtitle: 'Mera Ghar',
    description:
      'Ghar sirf char deewaron se nahi banta. Tum jahan ho, mera aashiyana wahin hai. With you, I am safe, vulnerable, and completely myself.',
    quote: 'Home is not a place, Sanidhya. It has always been you.',
  },
  {
    id: 'forever',
    title: 'My Forever',
    emoji: '🤍',
    subtitle: 'Hamesha Ke Liye',
    description:
      'Chhote-mote jhagde aur gusse hamare pyaar ke aage bahut chhote hain. Main chahta hoon ki hum har mushkil ko saath milkar samjhein, ek doosre ke khilaf nahi.',
    quote: 'Through every high and every low, my hand stays in yours.',
  },
];

export const PROMISES: PromiseItem[] = [
  {
    id: 'listen-first',
    title: 'Listen Before Speaking',
    hindiTitle: 'Pehle Samjhunga, Phir Bolunga',
    description:
      'Main promise karta hoon ki jab bhi koi baat aayegi, main apna gussa dikhane ke bajaye shaanti se tumhari baat pehle sununga.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'no-venting',
    title: 'Never Directing Anger at You',
    hindiTitle: 'Apna Gussa Tum Par Nahi Nikalunga',
    description:
      'Outside stress ya frustration meri zimmedari hai, tum par gussa nikalne ka mujhe koi haq nahi. You deserve gentle warmth.',
    iconName: 'ShieldHeart',
  },
  {
    id: 'patience',
    title: 'Always Choosing Patience',
    hindiTitle: 'Sabr Aur Pyaar',
    description:
      'Whenever things get heated, I will pause, breathe, and remember how precious you are to me before uttering any word.',
    iconName: 'Sparkles',
  },
  {
    id: 'unconditional-care',
    title: 'You Are My Priority',
    hindiTitle: 'Tum Mere Liye Sabse Important Ho',
    description:
      'Meri ego se hazaar guna bada hum dono ka rishta aur tumhari feelings hain. I will always protect your smile.',
    iconName: 'Heart',
  },
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    title: 'When Our Journey Began',
    date: 'A Day Etched in Gold',
    location: 'Where it all started',
    description:
      'Woh pehli baar jab maine tumhari aankhon me dekha tha aur laga tha ki haan, meri zindagi ka sabse khoobsurat faisla tum ho.',
    imageUrl:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mem-2',
    title: 'Our Late Night Talks & Chai',
    date: 'Uncountable Warm Nights',
    location: 'Our Cozy Corner',
    description:
      'Raat ke 2 baje bina kisi matlab ki baatein, tumhari sweet laughter, aur woh choti-choti baatein jo sirf hum dono samajhte hain.',
    imageUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mem-3',
    title: 'That Beautiful Rainy Walk',
    date: 'Our Quiet Moments',
    location: 'Under One Umbrella',
    description:
      'Haath me haath pakad kar chalna, thandi hawa aur tumhara mere kandhe par sar rakhna. Wahi lamha meri life ka sabse peaceful pal tha.',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mem-4',
    title: 'Your Contagious Smile',
    date: 'Every Single Day',
    location: 'In My Heart',
    description:
      'Jab tum khilkhilakar hasti ho, toh lagta hai sab theek hai. Main kabhi tumhari us hansi ko chheen-na nahi chahta.',
    imageUrl:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  },
];

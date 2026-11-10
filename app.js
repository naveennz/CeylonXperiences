/* ============================================================
   CEYLONXPERIENCES — APP.JS
   Complete Application Logic
   ============================================================ */

// ============================================================
// DATA: EXPERIENCES (with gallery images)
// ============================================================
const experiences = [
  {
    id:1,cat:'cooking',lat:6.9344,lng:79.8428,artisanId:1,
    imgUrl:'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'Popular',badgeType:'popular',title:'Traditional Rice & Curry Masterclass',
    location:'Colombo Fort',loc:'colombo',rating:'4.96',reviews:312,numericPrice:4500,
    duration:'3 hours',size:'2–6 guests',skill:'Beginner',lang:'English / Sinhala',
    desc:'Learn to prepare a full Sri Lankan rice and curry spread in a family home in Pettah. Master the art of tempering mustard seeds, grinding fresh coconut sambol, and balancing the holy trinity of Sri Lankan spice.',
    includes:['Apron & equipment','All ingredients','Full meal','Recipe booklet','Ayurvedic spice kit'],
    slots:{'09:00 AM':2,'02:30 PM':5,'05:00 PM':0}
  },
  {
    id:2,cat:'gems',lat:6.6828,lng:80.3992,artisanId:2,
    imgUrl:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'Featured',badgeType:'',title:'Sapphire Faceting & Gem Grading',
    location:'Ratnapura',loc:'ratnapura',rating:'4.98',reviews:89,numericPrice:18000,
    duration:'4 hours',size:'2–4 guests',skill:'No experience needed',lang:'English',
    desc:'Sit with a third-generation gem cutter in Ratnapura\'s gem bazaar. Learn how raw corundum becomes a dazzling blue sapphire — from rough grading to faceting on a traditional lap wheel.',
    includes:['Gem cutting session','Your finished gemstone','Gem grading certificate','Tea & refreshments'],
    slots:{'09:00 AM':1,'02:30 PM':3,'05:00 PM':2}
  },
  {
    id:3,cat:'pottery',lat:6.9547,lng:79.9197,artisanId:3,
    imgUrl:'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'New',badgeType:'new',title:'Ancient Kelaniya Pottery Workshop',
    location:'Kelaniya',loc:'kelaniya',rating:'4.92',reviews:54,numericPrice:3800,
    duration:'2.5 hours',size:'2–8 guests',skill:'All levels',lang:'English / Sinhala',
    desc:'Kelaniya has produced terracotta pottery for over 2,000 years. Work the wheel with a master potter from a lineage traced back 12 generations. Shape your own vessel, engrave traditional motifs, and fire it in a wood kiln.',
    includes:['Wheel throwing session','Clay & tools provided','Fired pottery to take home','Workshop tea'],
    slots:{'09:00 AM':6,'02:30 PM':2,'05:00 PM':0}
  },
  {
    id:4,cat:'tea',lat:6.9497,lng:80.7891,artisanId:4,
    imgUrl:'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'',badgeType:'',title:'High-Country Tea Estate Walk & Blending',
    location:'Nuwara Eliya',loc:'nuwara eliya',rating:'4.94',reviews:211,numericPrice:6200,
    duration:'5 hours',size:'2–10 guests',skill:'Beginner',lang:'English / Tamil',
    desc:'Walk misty rows of tea bushes at 6,000ft with a plantation supervisor who has tasted thousands of brews. Learn to hand-pluck two leaves and a bud, witness the orthodox rolling process, and blend your own single-origin tea.',
    includes:['Guided estate walk','Factory tour','Tea tasting flight','Custom blended 100g tin'],
    slots:{'09:00 AM':4,'02:30 PM':4,'05:00 PM':1}
  },
  {
    id:5,cat:'batik',lat:6.0535,lng:80.2210,artisanId:5,
    imgUrl:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'Popular',badgeType:'popular',title:'Batik Fabric Dyeing Masterclass',
    location:'Galle Fort',loc:'galle',rating:'4.91',reviews:178,numericPrice:5500,
    duration:'3.5 hours',size:'2–6 guests',skill:'Beginner',lang:'English',
    desc:'In a colonial Dutch-era workshop inside Galle Fort, learn the wax-resist art of batik. Design your own pattern, apply hot wax with a tjanting pen, and dye a 1-metre silk scarf in traditional Sri Lankan motifs.',
    includes:['All materials & dye','Finished batik scarf','Artist certificate'],
    slots:{'09:00 AM':2,'02:30 PM':0,'05:00 PM':5}
  },
  {
    id:6,cat:'cooking',lat:9.6615,lng:80.0255,artisanId:6,
    imgUrl:'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'',badgeType:'',title:'Jaffna Crab Curry Coastal Cooking',
    location:'Jaffna Coastline',loc:'any',rating:'4.97',reviews:67,numericPrice:7200,
    duration:'4 hours',size:'2–6 guests',skill:'Intermediate',lang:'English / Tamil',
    desc:'North Sri Lankan cuisine is unlike anything in the south. Join a Tamil home cook in her beachside kitchen to prepare the legendary Jaffna crab curry — fiery, fragrant, and finished with stone-ground katta sambol.',
    includes:['Market visit with host','All ingredients','Full meal for group'],
    slots:{'09:00 AM':3,'02:30 PM':2,'05:00 PM':2}
  },
  {
    id:7,cat:'wellness',lat:7.2906,lng:80.6337,artisanId:7,
    imgUrl:'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'',badgeType:'',title:'Ayurvedic Oil Prep & Massage Basics',
    location:'Kandy Hills',loc:'kandy',rating:'4.89',reviews:143,numericPrice:8500,
    duration:'3 hours',size:'1–4 guests',skill:'No experience needed',lang:'English / Sinhala',
    desc:'Enter a 200-year-old Ayurvedic dispensary in Kandy\'s hills. Learn to identify medicinal herbs grown in the garden, grind and infuse oils using traditional stone methods, and receive a short Shirodhara consultation.',
    includes:['Herb garden tour','Oil infusion class','30-min Shirodhara'],
    slots:{'09:00 AM':1,'02:30 PM':1,'05:00 PM':0}
  },
  {
    id:8,cat:'dance',lat:7.2936,lng:80.6412,artisanId:8,
    imgUrl:'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
    ],
    badge:'New',badgeType:'new',title:'Kandyan Drumming & Costume Workshop',
    location:'Kandy Center',loc:'kandy',rating:'4.95',reviews:39,numericPrice:5000,
    duration:'2 hours',size:'2–8 guests',skill:'Beginner',lang:'English / Sinhala',
    desc:'The Kandyan drum (geta beraya) is one of the world\'s most complex percussion instruments. Sit with a traditional master to learn the fundamental thala rhythms and try on full Kandyan dancer costumes.',
    includes:['Drum lesson (geta beraya)','Costume fitting & photos'],
    slots:{'09:00 AM':4,'02:30 PM':3,'05:00 PM':6}
  },
];

// ============================================================
// DATA: ARTISANS
// ============================================================
const artisans = [
  {id:1,name:'Priya Jayawardena',role:'Master Home Cook',location:'Colombo Fort',years:22,bio:'Third-generation home cook from Pettah, Priya has been hosting international travelers since 2018. Her family recipes trace origins to the Portuguese and Dutch colonial eras, adapted lovingly over generations. She has been featured in Sri Lanka\'s premier food magazine for her authentic pit-cooked biryani and coconut sambol techniques.',experienceIds:[1],rating:'4.96',totalReviews:312,initials:'P'},
  {id:2,name:'Suresh Rajapaksa',role:'Master Gem Cutter',location:'Ratnapura',years:35,bio:'A third-generation gem artisan with 35 years of faceting experience. Suresh has supplied certified Sri Lankan sapphires to jewellers across 20+ countries and was awarded the National Craft Master Award in 2019. He maintains the last manually-operated traditional lap wheel in Ratnapura\'s gem district.',experienceIds:[2],rating:'4.98',totalReviews:89,initials:'S'},
  {id:3,name:'Nimal Wickrama',role:'Pottery Master',location:'Kelaniya',years:28,bio:'12th generation descendant of the Kelaniya pottery lineage, Nimal learned the ancient terracotta craft from his grandfather at age 8. His ceremonial vessels feature in the National Museum of Colombo. He was one of 12 artisans selected for Sri Lanka\'s living heritage registry in 2022.',experienceIds:[3],rating:'4.92',totalReviews:54,initials:'N'},
  {id:4,name:'Chamari Peiris',role:'Tea Estate Supervisor & Taster',location:'Nuwara Eliya',years:17,bio:'A certified tea taster and estate supervisor with 17 years at the Dimbula highlands, Chamari can identify over 120 distinct tea profiles by aroma alone. She leads sensory training programs for the Sri Lanka Tea Board and was named one of Asia\'s Top 30 Women in Tea by the Specialty Tea Institute.',experienceIds:[4],rating:'4.94',totalReviews:211,initials:'C'},
  {id:5,name:'Amara de Silva',role:'Batik Master',location:'Galle Fort',years:20,bio:'Born inside Galle Fort, Amara learned batik dyeing from Javanese masters before returning to Sri Lanka to create her own studio blending traditional lotus motifs with contemporary geometric design. Her scarves have been carried in boutiques in Tokyo, Paris, and New York.',experienceIds:[5],rating:'4.91',totalReviews:178,initials:'A'},
  {id:6,name:'Meena Arulpragasam',role:'Coastal Home Cook',location:'Jaffna',years:38,bio:'Meena\'s beachside kitchen in Jaffna has been the setting for hundreds of unforgettable meals across 38 years. Her crab curry recipe, passed from her mother, was featured in a BBC travel documentary on Northern Sri Lanka. She sources her crab fresh from the Jaffna Lagoon every morning before class.',experienceIds:[6],rating:'4.97',totalReviews:67,initials:'M'},
  {id:7,name:'Dr. Ruwan Amarasinghe',role:'Ayurvedic Physician & Herbalist',location:'Kandy Hills',years:24,bio:'A qualified Ayurvedic doctor and herbalist, Dr. Ruwan runs a 200-year-old family dispensary in the Kandy hills where he personally cultivates over 80 medicinal herb varieties. He studied Ayurvedic medicine in Kerala before returning to extend his family\'s healing tradition for a new generation.',experienceIds:[7],rating:'4.89',totalReviews:143,initials:'R'},
  {id:8,name:'Asanka Gunaratne',role:'Kandyan Drum Master',location:'Kandy Center',years:30,bio:'Asanka has performed at royal ceremonies, state functions, and international festivals across 30 countries. A recipient of the Presidential Cultural Award, he teaches the ancient geta beraya tradition to the next generation and is personally credited with documenting 14 nearly-lost rhythmic compositions.',experienceIds:[8],rating:'4.95',totalReviews:39,initials:'A'},
];

// ============================================================
// DATA: BLOG ARTICLES
// ============================================================
const blogArticles = [
  {
    id:1,title:'A Morning Inside a Ratnapura Gem Pit',
    category:'Gems & Culture',readTime:'5 min read',
    author:'Chamara Perera',authorInitials:'CP',date:'July 2026',
    imgUrl:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    excerpt:'We descended 12 feet into the earth, the walls glistening with moisture, a single lantern casting amber light over generations of geology...',
    content:`<p>The journey to Ratnapura begins before dawn. By 5:30am, the air is cool and thick with mist as the van winds through the rubber and tea groves of the Sabaragamuwa Province. This is gem country — the City of Gems — where alluvial gravel beds beneath ordinary paddy fields have yielded Ceylon's most celebrated exports for over two thousand years.</p><h3>Into the Pit</h3><p>Master gem cutter Suresh Rajapaksa greets us at the edge of a modest earthen depression that turns out to be the mouth of a vertical shaft. We descended 12 feet into the earth, the walls glistening with moisture, a single lantern casting amber light over the cross-section of geological history packed into each layer of clay.</p><blockquote>"My grandfather found a 28-carat star sapphire right here," Suresh says, tapping a grey gravel seam. "Same layer. Same earth. Every bucket could be that day."</blockquote><p>The gravel — called illam — is hauled up in wicker baskets and washed through a wooden cradle sluice over a stream. Workers crouch in ankle-deep water, swirling the sediment away to reveal what the mountain has kept secret for millennia: corundum, spinel, cat's-eye chrysoberyl.</p><h3>At the Cutting Wheel</h3><p>Back in Suresh's workshop, a row of traditional lap wheels spin steadily. The faceting process is meditative — each angle calculated by hand, each facet polished over hours. He guides our hands on the wheel, showing how a rough blue pebble transforms face by face into a stone that captures light and holds it.</p><p>By the time we leave, we each carry a small, rough-faceted sapphire wrapped in paper — not perfect by commercial standards, but entirely our own. That, Suresh explains, is the whole point.</p>`
  },
  {
    id:2,title:'The Last Tea Tasters of Dimbula',
    category:'Tea & Plantations',readTime:'6 min read',
    author:'Nadia Fernandez',authorInitials:'NF',date:'June 2026',
    imgUrl:'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    excerpt:'At 6,000 feet above sea level, the mist rolls in before 8am. Chamari has tasted over 40,000 individual cups and can tell you the time of day a batch was withered from its flavour alone...',
    content:`<p>The morning light at 6,000 feet is different. It comes sideways through the mist, catching the dew on the tea bushes so that whole hillsides appear to glow. Chamari Peiris has watched this light every morning for 17 years, first as a picking supervisor, now as one of the youngest senior tea tasters in the Dimbula region.</p><h3>A Language Without Words</h3><p>Tea tasting, she explains, is not really about taste at all. It's about memory and reference. The 40,000-odd cups she has evaluated are all filed somewhere in her nervous system, waiting to be matched against what's in the cup today. "Bright" means the liquor has a clear, brisk quality. "Biscuity" signals a good second-flush character. "Woody" suggests something went wrong in the withering.</p><blockquote>"A bad cup tells a story just as clearly as a good one. More clearly, maybe. It's pointing to a problem you can fix tomorrow."</blockquote><h3>The Walk Through the Rows</h3><p>Guests at Chamari's estate experience begin before the factory. We walk the rows at dawn, learning to identify the two-leaves-and-a-bud configuration that determines quality. The physical sensation of plucking — the precise angle, the snap of a healthy stem — is something no description adequately prepares you for.</p><p>In the factory, the air is humid and sweet with the smell of oxidising leaf. The orthodox rolling machines — some over 60 years old — creak and hum through the withered leaf. Chamari lays out six cups on a wooden tasting bar and shows us what all these hours of processing produce: six distinctly different teas from the same hillside, the same morning, the same hands.</p>`
  },
  {
    id:3,title:'Wax, Thread and the Art of Resistance',
    category:'Batik & Craft',readTime:'4 min read',
    author:'James Whitfield',authorInitials:'JW',date:'May 2026',
    imgUrl:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    excerpt:'The tjanting pen holds melted wax at exactly the right temperature. Too hot and it bleeds; too cold and it clogs. Amara de Silva has held this tool every day for 20 years and makes it look effortless...',
    content:`<p>Inside a Dutch colonial building on the ramparts of Galle Fort, the air smells of beeswax, indigo dye, and sea salt blowing in from the Indian Ocean. Amara de Silva has occupied this studio for seven years, though the building itself has stood for three centuries. "The walls have seen everything," she laughs, spreading a piece of white silk over a wooden frame. "They don't judge bad first attempts."</p><h3>The Wax Resist Method</h3><p>Batik — the wax-resist dyeing technique — arrived in Sri Lanka via Javanese traders centuries before the Europeans came. Amara learned the craft from a Javanese master in Yogyakarta before returning to Galle to develop her own style, blending classical lotus and elephant motifs with geometric patterns she calls "Ocean Grid."</p><blockquote>"The wax is the drawing. The wax decides what stays white. Everything else becomes colour. Once you understand that logic, the whole technique changes."</blockquote><h3>Learning by Doing</h3><p>The tjanting pen — a small copper bowl on a wooden handle — holds melted wax at exactly the right temperature. Too hot and it bleeds through the silk; too cool and it clogs the spout. Amara explains this once, demonstrates it once, and then puts the tool in your hand.</p><p>The first few strokes are tentative. The wax flows faster than expected, controlled less than hoped. But within 20 minutes, something shifts — the hand learns the weight, the pace, the angle. By the end of three hours, each guest carries home a metre of hand-dyed silk that is imperfect, personal, and entirely irreplaceable.</p>`
  }
];

// ============================================================
// DATA: REVIEWS
// ============================================================
const mockReviews = [
  {stars:'★★★★★',text:'"Making hoppers with Priya\'s grandmother at dawn — the smell of coconut milk, the clay chatties, the birdsong. Unforgettable."',name:'Sophie B.',origin:'London, UK'},
  {stars:'★★★★★',text:'"The gem mine tour was unlike anything — we actually descended into the mine and cut our own stones. Absolute magic."',name:'Mika K.',origin:'Tokyo, Japan'},
  {stars:'★★★★★',text:'"Kandyan drumming session felt like a spiritual awakening. The master had 40 years of experience and infinite patience."',name:'Aarav R.',origin:'Mumbai, India'},
];

// ============================================================
// DATA: EXCHANGE RATES
// ============================================================
const exchangeRates = {
  LKR:{symbol:'LKR ',rate:1},
  USD:{symbol:'$',rate:0.0033},
  EUR:{symbol:'€',rate:0.0030},
  GBP:{symbol:'£',rate:0.0026}
};

// ============================================================
// DATA: TRANSLATIONS
// ============================================================
const translations = {
  en:{navExplore:'Explore',navGift:'Gift an Experience',navTeams:'For Teams',navHost:'Become a host',navSignIn:'Sign In',heroTag:'LOCAL PEOPLE. MEMORABLE EXPERIENCES.',heroTitle:'A little closer<br>to <em>Sri Lanka.</em>',heroDesc:'Cook, create and explore with local hosts. Discover the island through the people who call it home.',searchType:'Experience Type',searchLoc:'Location',searchGuests:'Guests',searchBtn:'Search'},
  si:{navExplore:'ගවේෂණය කරන්න',navGift:'තෑගි පතක් දෙන්න',navTeams:'කණ්ඩායම් සඳහා',navHost:'ඔබේ අත්දැකීම එක්කරන්න',navSignIn:'ඇතුළු වන්න',heroTag:'🌿 සැබෑ ශ්‍රී ලාංකේය සංස්කෘතික අත්දැකීම්',heroTitle:'ශ්‍රී ලංකාවේ හදවත<br><em>සොයායන්න</em>',heroDesc:'රත්නපුරයේ මැණික් කැපීමේ සිට නුවරඑළියේ තේ සෑදීම දක්වා වූ දේශීය ශිල්පීන්ගේ සැබෑ අත්දැකීම් වෙන්කරවා ගන්න.',searchType:'අත්දැකීම් වර්ගය',searchLoc:'ස්ථානය',searchGuests:'අමුත්තන්',searchBtn:'සොයන්න'},
  ta:{navExplore:'ஆராயுங்கள்',navGift:'பரிசு அட்டை',navTeams:'குழுக்களுக்கு',navHost:'அனுபவத்தைப் பட்டியலிட',navSignIn:'உள்நுழைய',heroTag:'🌿 உண்மையான இலங்கை கலாச்சார அனுபவங்கள்',heroTitle:'இலங்கையின் ஆன்மாவை<br><em>கண்டறியவும்</em>',heroDesc:'இரத்தினபுரியின் இரத்தினக் கல் செதுக்கல் முதல் நுவரெலியாவின் தேயிலை தயாரிப்பு வரை உள்ளூர் கைவினைஞர்களின் நேரடி அனுபவங்களைப் பதிவு செய்யுங்கள்.',searchType:'அனுபவ வகை',searchLoc:'இடம்',searchGuests:'விருந்தினர்கள்',searchBtn:'தேடுங்கள்'}
};

// ============================================================
// GLOBAL STATE
// ============================================================
let currentCurrency = 'LKR';
let currentLanguage = 'en';
let currentActiveCategory = 'all';
let currentSelectedExperienceForCheckout = null;
let businessListingSelectedCategory = '';
let leafletMapInstance = null;
let leafletMarkersGroup = null;
let isMapViewActive = false;
let currentSortKey = 'default';
let currentSkillFilter = 'all';
let wishlist = [];
let isUserLoggedIn = false;
let currentArticleId = null;

const simulatedUser = {
  name:'Alex Rivera',email:'alex.rivera@email.com',initials:'AR',memberSince:'March 2025',
  bookings:[
    {id:'CEX-482901',experienceId:3,date:'2026-08-22',slot:'09:00 AM',guests:2,status:'upcoming',paid:7600},
    {id:'CEX-371044',experienceId:1,date:'2026-07-20',slot:'02:30 PM',guests:4,status:'completed',paid:18450},
    {id:'CEX-219873',experienceId:5,date:'2026-06-30',slot:'05:00 PM',guests:2,status:'cancelled',paid:0},
  ]
};

// ============================================================
// CURRENCY & LANGUAGE
// ============================================================
async function initLiveExchangeRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/LKR');
    const data = await res.json();
    if (data && data.rates) {
      exchangeRates.USD.rate = data.rates.USD;
      exchangeRates.EUR.rate = data.rates.EUR;
      exchangeRates.GBP.rate = data.rates.GBP;
    }
  } catch(err) {
    console.warn('Using fallback exchange rates:', err);
  }
}

function formatPrice(lkrAmount) {
  const conf = exchangeRates[currentCurrency];
  const converted = Math.round(lkrAmount * conf.rate);
  return conf.symbol + converted.toLocaleString();
}

function changeCurrency(currCode) {
  currentCurrency = currCode;
  document.querySelectorAll('.dynamic-price').forEach(el => {
    const base = Number(el.getAttribute('data-base'));
    if (base) el.textContent = formatPrice(base);
  });
  renderCards();
  if (currentSelectedExperienceForCheckout) recalculateCheckoutTotals();
}

function changeLanguage(langCode) {
  currentLanguage = langCode;
  const dict = translations[langCode] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
}

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = {
    success:`<svg class="toast-icon success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:`<svg class="toast-icon error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:`<svg class="toast-icon info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type]||icons.success}<span class="toast-msg">${message}</span><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 350); }, 4000);
}

// ============================================================
// WISHLIST
// ============================================================
function initWishlist() {
  try { wishlist = JSON.parse(localStorage.getItem('cxp_wishlist') || '[]'); }
  catch { wishlist = []; }
}

function toggleWishlist(experienceId, event) {
  if (event) event.stopPropagation();
  const id = Number(experienceId);
  const btn = document.querySelector(`.card-wishlist-btn[data-id="${id}"]`);
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    showToast('Added to your wishlist ❤️', 'success');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  }
  localStorage.setItem('cxp_wishlist', JSON.stringify(wishlist));
  if (btn) { btn.classList.toggle('active', wishlist.includes(id)); btn.classList.add('pulse'); btn.addEventListener('animationend', () => btn.classList.remove('pulse'), {once:true}); }
  updateWishlistButtons();
  updateWishlistNavCount();
  if (document.getElementById('view-wishlist') && document.getElementById('view-wishlist').classList.contains('active')) renderWishlistView();
}

function updateWishlistButtons() {
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    const id = Number(btn.getAttribute('data-id'));
    btn.classList.toggle('active', wishlist.includes(id));
    btn.querySelector('svg').style.fill = wishlist.includes(id) ? 'currentColor' : 'none';
  });
}

function updateWishlistNavCount() {
  const countEl = document.getElementById('wishlist-nav-count');
  if (!countEl) return;
  if (wishlist.length > 0) { countEl.textContent = wishlist.length; countEl.style.display = 'inline-flex'; }
  else { countEl.style.display = 'none'; }
}

function renderWishlistView() {
  const grid = document.getElementById('wishlist-grid');
  if (!grid) return;
  const saved = experiences.filter(e => wishlist.includes(e.id));
  if (saved.length === 0) {
    grid.innerHTML = `<div class="wishlist-empty"><div class="wishlist-empty-icon">🤍</div><h3>Your wishlist is empty</h3><p>Tap the heart icon on any experience to save it here.</p><button class="book-btn" style="margin-top:1.5rem;max-width:220px;" onclick="navigateTo('explore')">Discover Experiences</button></div>`;
    return;
  }
  grid.innerHTML = saved.map(e => buildCardHTML(e)).join('');
  setTimeout(() => { updateWishlistButtons(); animateCards('#wishlist-grid .card'); }, 50);
}

// ============================================================
// CARD BUILDER (centralized)
// ============================================================
function buildCardHTML(e) {
  const wishlisted = wishlist.includes(e.id);
  return `<div class="card" role="listitem">
    <div class="card-img-wrapper">
      <img class="card-img-actual" src="${e.imgUrl}" alt="${e.title}" loading="lazy">
      
      <button class="card-wishlist-btn ${wishlisted?'active':''}" data-id="${e.id}" onclick="toggleWishlist(${e.id},event)" title="Save to wishlist" aria-label="Save to wishlist">
        <svg viewBox="0 0 24 24" fill="${wishlisted?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;color:${wishlisted?'var(--ruby)':'var(--muted)'}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="card-body">
      <div class="card-category">${catLabel(e.cat)}</div>
      <button class="card-title card-open" onclick="openModal(${e.id})">${e.title}</button>
      <div class="card-location"><svg class="icon"><use href="#icon-map-pin"></use></svg>${e.location}</div>
      <div class="card-meta">
        <div class="card-meta-item"><svg class="icon" style="fill:none;"><use href="#icon-clock"></use></svg>${e.duration}</div>
        <div class="card-meta-item"><svg class="icon"><use href="#icon-users"></use></svg>${e.size}</div>
      </div>
      <div class="card-footer">
        <div class="card-rating"><svg class="icon"><use href="#icon-star"></use></svg>${e.rating} <span style="color:var(--muted);font-weight:400">(${e.reviews})</span></div>
        <div class="card-price">${formatPrice(e.numericPrice)}<span>/person</span></div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// FILTER / SORT
// ============================================================
function applyFiltersAndSort(data) {
  let result = [...data];
  if (currentSkillFilter !== 'all') result = result.filter(e => e.skill.toLowerCase().includes(currentSkillFilter));
  if (currentSortKey === 'price-asc') result.sort((a,b) => a.numericPrice - b.numericPrice);
  else if (currentSortKey === 'price-desc') result.sort((a,b) => b.numericPrice - a.numericPrice);
  else if (currentSortKey === 'rating') result.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating));
  else if (currentSortKey === 'duration') result.sort((a,b) => parseFloat(a.duration) - parseFloat(b.duration));
  return result;
}
function onSortChange(val) { currentSortKey = val; renderCards(); }
function onSkillFilterChange(val) { currentSkillFilter = val; renderCards(); }
function clearAllFilters() {
  currentSortKey = 'default'; currentSkillFilter = 'all';
  const ss = document.getElementById('sort-select'); if (ss) ss.value = 'default';
  const sk = document.getElementById('skill-select'); if (sk) sk.value = 'all';
  renderCards();
  showToast('Filters cleared', 'info');
}

// ============================================================
// RENDER CARDS
// ============================================================
function renderCards(dataSet = experiences) {
  const grid = document.getElementById('cards-grid');
  if (!grid) return;
  let base = currentActiveCategory === 'all' ? [...dataSet] : dataSet.filter(e => e.cat === currentActiveCategory);
  const filtered = applyFiltersAndSort(base);
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = `${filtered.length} experience${filtered.length !== 1 ? 's' : ''} found`;
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;padding:3rem;text-align:center;color:var(--muted)"><div style="font-size:40px;margin-bottom:1rem">🔍</div><div style="font-size:16px;font-weight:600;margin-bottom:0.5rem;">No experiences found</div><div style="font-size:14px;">Try adjusting your filters or <span style="color:var(--teal);cursor:pointer;font-weight:600;" onclick="clearAllFilters()">clear all filters</span></div></div>`;
    return;
  }
  grid.innerHTML = filtered.map(e => buildCardHTML(e)).join('');
  setTimeout(() => { updateWishlistButtons(); animateCards('#cards-grid .card'); }, 30);
}

// ============================================================
// CARD ANIMATIONS
// ============================================================
function animateCards(selector = '.card') {
  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 65);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  cards.forEach(card => observer.observe(card));
}

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
function initStatsCounter() {
  const strip = document.querySelector('.stats-strip');
  if (!strip) return;
  const targets = [340, 120, 18000, 4.9];
  const suffixes = ['+', '+', '+', '★'];
  const els = Array.from(strip.querySelectorAll('.stat-num'));
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      els.forEach((el, i) => {
        const target = targets[i];
        const isDecimal = target % 1 !== 0;
        const step = target / 45;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffixes[i];
          if (current >= target) clearInterval(timer);
        }, 30);
      });
      observer.disconnect();
    }
  }, { threshold: 0.6 });
  observer.observe(strip);
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), {passive:true});
  btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

// ============================================================
// PARALLAX HERO
// ============================================================
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY < hero.offsetHeight + 100) {
          hero.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
}

// ============================================================
// LEAFLET MAP
// ============================================================
function toggleMapView() {
  isMapViewActive = !isMapViewActive;
  const mapWrapper = document.getElementById('map-view-wrapper');
  const cardsGrid = document.getElementById('cards-grid');
  const btnText = document.getElementById('map-btn-text');
  if (isMapViewActive) {
    mapWrapper.classList.add('active');
    cardsGrid.classList.add('hidden');
    btnText.textContent = 'Show Cards Grid View';
    initLeafletMapIfNeeded();
  } else {
    mapWrapper.classList.remove('active');
    cardsGrid.classList.remove('hidden');
    btnText.textContent = 'Interactive Map View';
  }
}

function initLeafletMapIfNeeded() {
  if (!leafletMapInstance) {
    leafletMapInstance = L.map('leaflet-map').setView([7.8731,80.7718],8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(leafletMapInstance);
    leafletMarkersGroup = L.layerGroup().addTo(leafletMapInstance);
  }
  updateMapMarkers();
  setTimeout(() => leafletMapInstance.invalidateSize(), 200);
}

function updateMapMarkers() {
  if (!leafletMarkersGroup) return;
  leafletMarkersGroup.clearLayers();
  const dataSet = currentActiveCategory === 'all' ? experiences : experiences.filter(e => e.cat === currentActiveCategory);
  dataSet.forEach(e => {
    const marker = L.marker([e.lat,e.lng]);
    marker.bindPopup(`<div style="width:160px;font-family:'DM Sans',sans-serif;"><img src="${e.imgUrl}" style="width:100%;height:88px;object-fit:cover;border-radius:8px;margin-bottom:6px;"><div style="font-weight:700;font-size:13px;line-height:1.2;color:#1E1E1E;margin-bottom:4px;">${e.title}</div><div style="color:#1A7A6E;font-weight:700;font-size:13px;">${formatPrice(e.numericPrice)}</div><button onclick="openModal(${e.id})" style="width:100%;margin-top:6px;background:#1A7A6E;color:#fff;border:none;padding:5px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;">Book Slot</button></div>`);
    leafletMarkersGroup.addLayer(marker);
  });
}

// ============================================================
// SLOT AVAILABILITY
// ============================================================
function updateLiveSlotAvailabilityBadge() {
  if (!currentSelectedExperienceForCheckout) return;
  const slot = document.getElementById('chk-slot').value;
  const spots = currentSelectedExperienceForCheckout.slots[slot] ?? 3;
  const box = document.getElementById('slot-status-container');
  const text = document.getElementById('slot-status-text');
  const btn = document.getElementById('step-1-next-btn');
  box.className = 'slot-status-box';
  if (spots === 0) {
    box.classList.add('soldout'); text.textContent = '❌ Fully Sold Out for this slot. Please pick another.';
    btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed';
  } else if (spots <= 2) {
    box.classList.add('urgent'); text.textContent = `⚡ Almost Sold Out! Only ${spots} spot${spots>1?'s':''} left!`;
    btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
  } else {
    box.classList.add('normal'); text.textContent = `✓ ${spots} open spots available for this session.`;
    btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
  }
}

// ============================================================
// NAV HANDLERS
// ============================================================
function toggleMobileNavMenu() {
  document.getElementById('menu-toggle-btn').classList.toggle('open');
  document.getElementById('nav-links-menu').classList.toggle('open');
}
function closeMobileNavMenu() {
  document.getElementById('menu-toggle-btn').classList.remove('open');
  document.getElementById('nav-links-menu').classList.remove('open');
}

// ============================================================
// ROUTER
// ============================================================
function navigateTo(viewId) {
  closeMobileNavMenu();
  document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) { target.classList.add('active'); window.scrollTo({top:0,behavior:'instant'}); }
  document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
  const link = document.getElementById('lnk-' + viewId);
  if (link) link.classList.add('active');
  if (viewId === 'list-experience') advanceBusinessOnboarding(1);
  if (viewId === 'dashboard') renderDashboardView();
  if (viewId === 'blog') renderBlogView();
  if (viewId === 'wishlist') renderWishlistView();
}

// ============================================================
// CATEGORY FILTERS
// ============================================================
function filterCards(cat) {
  currentActiveCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  const pill = document.getElementById('pill-' + cat);
  if (pill) { pill.classList.add('active'); pill.parentNode.scrollTo({left:pill.offsetLeft - 24,behavior:'smooth'}); }
  document.getElementById('grid-header-title').textContent = cat === 'all' ? 'Explore experiences' : `Category: ${catLabel(cat)}`;
  renderCards();
  if (isMapViewActive) updateMapMarkers();
}

function executeSearch() {
  const catFilter = document.getElementById('search-cat').value;
  const locFilter = document.getElementById('search-loc').value;
  let data = [...experiences];
  if (catFilter !== 'all') data = data.filter(e => e.cat === catFilter);
  if (locFilter !== 'any') data = data.filter(e => e.loc === locFilter);
  currentActiveCategory = 'all';
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  document.getElementById('pill-all').classList.add('active');
  document.getElementById('grid-header-title').textContent = 'Search Results';
  renderCards(data);
  if (isMapViewActive) updateMapMarkers();
  document.getElementById('grid-header-title').scrollIntoView({behavior:'smooth'});
  navigateTo('explore');
}

function catLabel(cat) {
  return {cooking:'Cooking & Cuisine',gems:'Gems & Jewellery',pottery:'Pottery & Crafts',tea:'Tea & Plantations',batik:'Batik & Crafts',wellness:'Ayurveda & Wellness',dance:'Dance & Drums'}[cat] || cat;
}

// ============================================================
// MODAL WITH IMAGE GALLERY
// ============================================================
let currentGalleryIndex = 0;

function openModal(id) {
  const e = experiences.find(x => x.id === id);
  if (!e) return;
  currentSelectedExperienceForCheckout = e;
  currentGalleryIndex = 0;

  // main image
  const mainImg = document.getElementById('modal-image');
  mainImg.src = e.gallery ? e.gallery[0] : e.imgUrl;

  // gallery strip
  const strip = document.getElementById('modal-gallery-strip');
  if (strip && e.gallery && e.gallery.length > 1) {
    strip.style.display = 'flex';
    strip.innerHTML = e.gallery.map((img, i) => `<img class="gallery-thumb ${i===0?'active':''}" src="${img}" alt="Gallery image ${i+1}" onclick="switchGalleryImage(${i})">`).join('');
  } else if (strip) { strip.style.display = 'none'; }

  // content
  document.getElementById('modal-cat').textContent = catLabel(e.cat);
  document.getElementById('modal-title').textContent = e.title;
  document.getElementById('modal-loc').textContent = '📍 ' + e.location;
  document.getElementById('modal-rating').innerHTML = `<svg class="icon"><use href="#icon-star"></use></svg>${e.rating} (${e.reviews} reviews)`;
  document.getElementById('modal-price').textContent = formatPrice(e.numericPrice) + '/person';
  document.getElementById('modal-dur').textContent = e.duration;
  document.getElementById('modal-size').textContent = e.size;
  document.getElementById('modal-skill').textContent = e.skill;
  document.getElementById('modal-lang').textContent = e.lang;
  document.getElementById('modal-desc').textContent = e.desc;
  document.getElementById('modal-includes').innerHTML = e.includes.map(i => `<div class="include-item"><svg class="icon"><use href="#icon-check"></use></svg>${i}</div>`).join('');

  // artisan chip
  const artisan = artisans.find(a => a.id === e.artisanId);
  const chipContainer = document.getElementById('modal-artisan-chip');
  if (chipContainer && artisan) {
    chipContainer.innerHTML = `<button class="artisan-chip" onclick="openArtisanProfile(${artisan.id},event)"><div class="artisan-chip-avatar">${artisan.initials}</div><span>Hosted by ${artisan.name}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-left:2px;"><polyline points="9 18 15 12 9 6"/></svg></button>`;
  }

  document.getElementById('modal-cta-action-btn').onclick = function() {
    document.getElementById('modal').classList.remove('open');
    initiateCheckoutProcess(e);
  };
  document.getElementById('modal').classList.add('open');
}

function switchGalleryImage(index) {
  if (!currentSelectedExperienceForCheckout || !currentSelectedExperienceForCheckout.gallery) return;
  currentGalleryIndex = index;
  document.getElementById('modal-image').src = currentSelectedExperienceForCheckout.gallery[index];
  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
}

function closeModal(e) {
  if (e.target === document.getElementById('modal')) document.getElementById('modal').classList.remove('open');
}

// ============================================================
// ARTISAN PROFILE
// ============================================================
function openArtisanProfile(artisanId, event) {
  if (event) event.stopPropagation();
  document.getElementById('modal').classList.remove('open');
  const artisan = artisans.find(a => a.id === artisanId);
  if (!artisan) return;
  renderArtisanView(artisan);
  navigateTo('artisan');
}

function renderArtisanView(artisan) {
  const view = document.getElementById('view-artisan');
  if (!view) return;
  view.querySelector('#artisan-avatar-el').textContent = artisan.initials;
  view.querySelector('#artisan-name-el').textContent = artisan.name;
  view.querySelector('#artisan-role-el').textContent = artisan.role;
  view.querySelector('#artisan-years-el').textContent = artisan.years + ' yrs exp';
  view.querySelector('#artisan-rating-el').textContent = artisan.rating + '★';
  view.querySelector('#artisan-reviews-el').textContent = artisan.totalReviews + ' reviews';
  view.querySelector('#artisan-bio-el').textContent = artisan.bio;
  view.querySelector('#artisan-loc-el').textContent = artisan.location;
  const grid = view.querySelector('#artisan-exp-grid');
  const artisanExperiences = experiences.filter(e => artisan.experienceIds.includes(e.id));
  grid.innerHTML = artisanExperiences.map(e => buildCardHTML(e)).join('');
  setTimeout(() => { updateWishlistButtons(); animateCards('#artisan-exp-grid .card'); }, 50);
}

// ============================================================
// BLOG
// ============================================================
function renderBlogView() {
  const grid = document.getElementById('blog-grid');
  const articleView = document.getElementById('article-view');
  const backBtn = document.getElementById('back-to-blog-btn');
  if (!grid) return;
  grid.style.display = 'grid';
  if (articleView) articleView.style.display = 'none';
  if (backBtn) backBtn.style.display = 'none';
  grid.innerHTML = blogArticles.map(a => `
    <div class="blog-card" onclick="openArticle(${a.id})">
      <div class="blog-img-wrap"><img class="blog-img" src="${a.imgUrl}" alt="${a.title}" loading="lazy"></div>
      <div class="blog-card-body">
        <span class="blog-tag">${a.category}</span>
        <div class="blog-title">${a.title}</div>
        <div class="blog-excerpt">${a.excerpt}</div>
        <div class="blog-footer">
          <div class="blog-author-row"><div class="blog-author-avatar">${a.authorInitials}</div><span>${a.author}</span></div>
          <span>${a.date} · ${a.readTime}</span>
        </div>
      </div>
    </div>`).join('');
}

function openArticle(id) {
  const article = blogArticles.find(a => a.id === id);
  if (!article) return;
  const grid = document.getElementById('blog-grid');
  const view = document.getElementById('article-view');
  const backBtn = document.getElementById('back-to-blog-btn');
  grid.style.display = 'none';
  view.style.display = 'block';
  if (backBtn) backBtn.style.display = 'inline-flex';
  view.innerHTML = `<img class="article-hero" src="${article.imgUrl}" alt="${article.title}"><span class="article-category">${article.category}</span><h1 class="article-h1">${article.title}</h1><div class="article-meta"><div class="blog-author-row"><div class="blog-author-avatar">${article.authorInitials}</div><strong>${article.author}</strong></div><span>📅 ${article.date}</span><span>⏱️ ${article.readTime}</span></div><div class="article-body">${article.content}</div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}

function backToBlog() {
  const grid = document.getElementById('blog-grid');
  const view = document.getElementById('article-view');
  const backBtn = document.getElementById('back-to-blog-btn');
  grid.style.display = 'grid';
  view.style.display = 'none';
  if (backBtn) backBtn.style.display = 'none';
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboardView() {
  const view = document.getElementById('view-dashboard');
  if (!view) return;
  const main = view.querySelector('#dashboard-main-content');
  if (!main) return;
  if (!isUserLoggedIn) {
    main.innerHTML = `<div style="text-align:center;padding:4rem 1rem;"><div style="font-size:52px;margin-bottom:1rem;">🔐</div><h3 style="font-family:'Playfair Display',serif;font-size:22px;margin-bottom:0.75rem;">Sign in to view your bookings</h3><p style="color:var(--muted);margin-bottom:1.5rem;font-size:15px;">Access your upcoming experiences, past adventures, and saved wishlist.</p><button class="book-btn" style="max-width:220px;" onclick="simulateLogin()">Sign In to Continue</button></div>`;
    return;
  }
  const upcoming = simulatedUser.bookings.filter(b => b.status === 'upcoming');
  const past = simulatedUser.bookings.filter(b => b.status !== 'upcoming');
  main.innerHTML = `
    <div class="dashboard-section-title">Upcoming Experiences (${upcoming.length})</div>
    ${upcoming.length ? upcoming.map(buildBookingCard).join('') : '<p style="color:var(--muted);font-size:14px;margin-bottom:2rem;">No upcoming bookings. <span style="color:var(--teal);cursor:pointer;font-weight:600;" onclick="navigateTo(\'explore\')">Explore experiences →</span></p>'}
    <div class="dashboard-section-title" style="margin-top:2rem;">Past Experiences (${past.length})</div>
    ${past.map(buildBookingCard).join('')}`;
}

function buildBookingCard(booking) {
  const exp = experiences.find(e => e.id === booking.experienceId);
  if (!exp) return '';
  const labels = {completed:'✓ Completed',upcoming:'⏰ Upcoming',cancelled:'✗ Cancelled'};
  let actions = '';
  if (booking.status === 'completed') actions = `<button class="booking-action-btn" onclick="openModal(${exp.id})">Re-book</button><button class="booking-action-btn" onclick="showToast('Review submitted! Thank you ✨','success')">Leave Review</button>`;
  else if (booking.status === 'upcoming') actions = `<button class="booking-action-btn" onclick="openModal(${exp.id})">View Details</button><button class="booking-action-btn" style="color:var(--red);" onclick="showToast('Cancellation request submitted.','info')">Cancel</button>`;
  return `<div class="booking-card"><img class="booking-thumb" src="${exp.imgUrl}" alt="${exp.title}"><div class="booking-info"><div class="status-badge ${booking.status}">${labels[booking.status]}</div><div class="booking-title">${exp.title}</div><div class="booking-meta-text">📅 ${booking.date} · ${booking.slot} · ${booking.guests} Guest${booking.guests>1?'s':''}<br>🔖 Ref: <strong>${booking.id}</strong></div>${booking.status!=='cancelled'?`<div class="booking-meta-text" style="color:var(--teal);font-weight:600;">${formatPrice(booking.paid)} paid</div>`:''}<div class="booking-actions">${actions}</div></div></div>`;
}

function simulateLogin() {
  isUserLoggedIn = true;
  const hero = document.getElementById('dashboard-user-hero');
  if (hero) hero.innerHTML = `<div class="dash-avatar">${simulatedUser.initials}</div><div><div class="dash-name">${simulatedUser.name}</div><div class="dash-meta">✉️ ${simulatedUser.email} &nbsp;·&nbsp; 🗓️ Member since ${simulatedUser.memberSince}</div></div>`;
  const signInBtn = document.getElementById('nav-signin-btn');
  if (signInBtn) { signInBtn.textContent = simulatedUser.name.split(' ')[0]; signInBtn.style.background = 'var(--gold-dark)'; }
  showToast(`Welcome back, ${simulatedUser.name}! 👋`, 'success');
  renderDashboardView();
}

// ============================================================
// CHECKOUT
// ============================================================
function initiateCheckoutProcess(exp) {
  currentSelectedExperienceForCheckout = exp;
  document.getElementById('chk-summary-title').textContent = exp.title;
  updateLiveSlotAvailabilityBadge();
  recalculateCheckoutTotals();
  goToCheckoutStep(1);
  navigateTo('checkout');
}

function recalculateCheckoutTotals() {
  if (!currentSelectedExperienceForCheckout) return;
  const guests = Number(document.getElementById('chk-guests').value);
  const base = currentSelectedExperienceForCheckout.numericPrice;
  const fee = 450;
  const total = (base * guests) + fee;
  document.getElementById('chk-summary-base').textContent = formatPrice(base);
  document.getElementById('chk-summary-fee').textContent = formatPrice(fee);
  document.getElementById('chk-summary-qty').textContent = guests + (guests === 1 ? ' Person' : ' People');
  document.getElementById('chk-summary-total').textContent = formatPrice(total);
}

function goToCheckoutStep(stepNumber) {
  // FIX: scope to #view-checkout only to avoid interfering with biz-steps
  document.querySelectorAll('#view-checkout .checkout-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#view-checkout .step-dot').forEach(d => d.classList.remove('active'));
  document.getElementById('step-' + stepNumber).classList.add('active');
  for (let i = 1; i <= stepNumber; i++) document.getElementById('dot-' + i).classList.add('active');
}

function confirmFinalBookingOrder() {
  const name = document.getElementById('chk-name').value;
  const date = document.getElementById('chk-date').value;
  const slot = document.getElementById('chk-slot').value;
  const guests = Number(document.getElementById('chk-guests').value);
  if (!date) { showToast('Please select a date.', 'error'); goToCheckoutStep(1); return; }
  if (!name) { showToast('Please enter your full name.', 'error'); return; }
  const exp = currentSelectedExperienceForCheckout;
  const total = (exp.numericPrice * guests) + 450;
  const artisan = artisans.find(a => a.id === exp.artisanId);
  renderConfirmationView({ title:exp.title, date, slot, guests, total, artisanName: artisan ? artisan.name : null });
}

// ============================================================
// CONFIRMATION PAGE
// ============================================================
function renderConfirmationView(data) {
  const ref = 'CEX-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('conf-ref').textContent = ref;
  document.getElementById('conf-experience').textContent = data.title;
  document.getElementById('conf-date').textContent = data.date;
  document.getElementById('conf-slot').textContent = data.slot;
  document.getElementById('conf-guests').textContent = data.guests + ' Guest' + (data.guests > 1 ? 's' : '');
  document.getElementById('conf-total').textContent = formatPrice(data.total);
  document.getElementById('conf-artisan').textContent = data.artisanName ? `${data.artisanName} will contact you within 24 hours to confirm details.` : 'Your artisan will contact you within 24 hours.';
  // Store for calendar/share
  window._lastBookingData = data; window._lastBookingData.ref = ref;
  navigateTo('confirmation');
  showToast('Booking confirmed! Check your details below. 🎉', 'success');
}

function downloadCalendarEvent() {
  const data = window._lastBookingData;
  if (!data) return;
  const date = data.date.replace(/-/g,'');
  const startH = data.slot.includes('09') ? '09' : data.slot.includes('02') ? '14' : '17';
  const endH = String(Number(startH) + 3).padStart(2,'0');
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${date}T${startH}0000\r\nDTEND:${date}T${endH}0000\r\nSUMMARY:${data.title}\r\nDESCRIPTION:CeylonXperiences booking ${data.ref}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const blob = new Blob([ics], {type:'text/calendar'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `CeylonXP-${data.ref}.ics`; a.click();
  showToast('Calendar event downloaded! 📅', 'success');
}

function shareOnWhatsApp() {
  const data = window._lastBookingData;
  if (!data) return;
  const msg = encodeURIComponent(`I just booked "${data.title}" on CeylonXperiences! 🌿\nDate: ${data.date} · Ref: ${data.ref}\nCheck them out: ceylonxperiences.lk`);
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// ============================================================
// GIFT PURCHASE
// ============================================================
function processGiftPurchase() {
  const to = document.getElementById('gift-to').value;
  const val = Number(document.getElementById('gift-val').value);
  const email = document.getElementById('gift-email').value;
  if (!to) { showToast('Please enter the recipient\'s name.', 'error'); return; }
  if (!email) { showToast('Please enter the recipient\'s email.', 'error'); return; }
  showToast(`Gift voucher of ${formatPrice(val)} sent to ${to}! 🎁`, 'success');
  setTimeout(() => navigateTo('explore'), 1500);
}

// ============================================================
// ARTISAN ONBOARDING
// ============================================================
function advanceBusinessOnboarding(stepNumber) {
  if (stepNumber === 2) {
    const n = document.getElementById('biz-reg-name').value;
    const e = document.getElementById('biz-reg-email').value;
    const p = document.getElementById('biz-reg-pass').value || '0000';
    if (!n || !e || !p) { showToast('Please fill out all registration fields.', 'error'); return; }
  }
  if (stepNumber === 3 && !businessListingSelectedCategory) {
    showToast('Please select a category for your experience.', 'error'); return;
  }
  document.querySelectorAll('#view-list-experience .checkout-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#view-list-experience .step-dot').forEach(d => d.classList.remove('active'));
  document.getElementById('biz-step-' + stepNumber).classList.add('active');
  for (let i = 1; i <= stepNumber; i++) document.getElementById('biz-dot-' + i).classList.add('active');
}

function selectBusinessCategory(el, cat) {
  document.querySelectorAll('.biz-cat-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  businessListingSelectedCategory = cat;
}

// ============================================================
// DUMMY HOST STORAGE (PURE CLIENT-SIDE / NO SERVER REQUIRED)
// ============================================================
function getStoredHost() {
  try {
    const raw = localStorage.getItem('cxp_current_host');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setStoredHost(host) {
  try {
    localStorage.setItem('cxp_current_host', JSON.stringify(host));
    const raw = localStorage.getItem('cxp_hosts');
    const hosts = raw ? JSON.parse(raw) : [];
    const idx = hosts.findIndex(h => h.email.toLowerCase() === host.email.toLowerCase());
    if (idx >= 0) hosts[idx] = host;
    else hosts.push(host);
    localStorage.setItem('cxp_hosts', JSON.stringify(hosts));
  } catch (e) {}
}

function removeStoredHost() {
  try {
    localStorage.removeItem('cxp_current_host');
  } catch (e) {}
}

async function finalizeBusinessSubmission() {
  const loc = document.getElementById('biz-location').value;
  const desc = document.getElementById('biz-desc').value;
  const rate = document.getElementById('biz-rate').value;
  const name = document.getElementById('biz-reg-name').value;
  const email = document.getElementById('biz-reg-email').value;
  const pass = document.getElementById('biz-reg-pass').value || '0000';
  if (!loc || !desc || !rate || !name || !email) { showToast('Please fill out all experience details.', 'error'); return; }

  const host = {
    id: 'H-' + Math.floor(1000 + Math.random() * 9000),
    name: name,
    owner: name,
    email: email,
    password: pass,
    location: loc,
    status: 'active',
    verified: true,
    commission: 20
  };
  setStoredHost(host);

  try {
    const rawGigs = localStorage.getItem('cxp_host_gigs');
    const gigs = rawGigs ? JSON.parse(rawGigs) : [];
    gigs.unshift({
      id: 'L-' + Math.floor(1000 + Math.random() * 9000),
      host: host.id,
      title: `I will host an authentic ${name} experience`,
      category: (businessListingSelectedCategory || 'Cooking & Cuisine'),
      location: loc,
      duration: '3 hours',
      price: parseInt(rate, 10) || 5000,
      capacity: 6,
      status: 'live',
      imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
      description: desc,
      policy: 'Cancel at least 48 hours before the session for a full refund.'
    });
    localStorage.setItem('cxp_host_gigs', JSON.stringify(gigs));
  } catch (e) {}

  showToast(`Welcome ${name}! Launching your Business Hub... 🌿`, 'success');
  setTimeout(() => { window.location.href = 'business.html'; }, 1000);
}

// ============================================================
// BECOME A HOST MODAL & MULTI-ACCOUNT DETECTION
// ============================================================
function openBecomeHostModal(tab = 'login') {
  const modal = document.getElementById('become-host-modal');
  if (!modal) { window.location.href = 'business.html'; return; }

  const loggedInBox = document.getElementById('host-modal-logged-in');
  const authTabsWrap = document.getElementById('host-modal-auth-tabs-wrap');
  const errorBox = document.getElementById('host-modal-error');
  if (errorBox) errorBox.style.display = 'none';

  const host = getStoredHost();
  if (host && host.name) {
    // PREVIOUSLY LOGGED IN: ONLY SHOW THAT ACCOUNT
    if (loggedInBox) {
      loggedInBox.style.display = 'block';
      loggedInBox.classList.remove('hidden');
    }
    if (authTabsWrap) {
      authTabsWrap.style.display = 'none';
      authTabsWrap.classList.add('hidden');
    }
    const nameEl = document.getElementById('host-modal-account-name');
    const emailEl = document.getElementById('host-modal-account-email');
    const roleEl = document.getElementById('host-modal-account-role');
    const avatarEl = document.getElementById('host-modal-account-avatar');
    if (nameEl) nameEl.textContent = host.name;
    if (emailEl) emailEl.textContent = host.email || '';
    if (roleEl) roleEl.textContent = `${host.role || 'Verified Partner'} · ${host.location || 'Sri Lanka'}`;
    if (avatarEl) {
      avatarEl.textContent = (host.name || 'SR').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    }
    modal.classList.add('open');
    return;
  }

  // NOT LOGGED IN: ONLY SHOW LOGIN AND SIGNUP
  if (loggedInBox) {
    loggedInBox.style.display = 'none';
    loggedInBox.classList.add('hidden');
  }
  if (authTabsWrap) {
    authTabsWrap.style.display = 'block';
    authTabsWrap.classList.remove('hidden');
  }
  switchHostModalTab(tab || 'login');
  modal.classList.add('open');
}

function closeBecomeHostModal() {
  const modal = document.getElementById('become-host-modal');
  if (modal) modal.classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBecomeHostModal();
});

function switchHostModalTab(tab) {
  const btnSignup = document.getElementById('host-tab-btn-signup');
  const btnLogin = document.getElementById('host-tab-btn-login');
  const formSignup = document.getElementById('host-modal-signup-form');
  const formLogin = document.getElementById('host-modal-login-form');
  const errorBox = document.getElementById('host-modal-error');
  if (errorBox) errorBox.style.display = 'none';

  if (tab === 'signup') {
    btnSignup?.classList.add('active');
    btnLogin?.classList.remove('active');
    if (formSignup) { formSignup.style.display = 'block'; formSignup.classList.remove('hidden'); }
    if (formLogin) { formLogin.style.display = 'none'; formLogin.classList.add('hidden'); }
  } else {
    btnLogin?.classList.add('active');
    btnSignup?.classList.remove('active');
    if (formLogin) { formLogin.style.display = 'block'; formLogin.classList.remove('hidden'); }
    if (formSignup) { formSignup.style.display = 'none'; formSignup.classList.add('hidden'); }
  }
}

function submitHostModalSignup(e) {
  e.preventDefault();
  const name = document.getElementById('hm-name')?.value.trim();
  const owner = document.getElementById('hm-owner')?.value.trim();
  const email = document.getElementById('hm-email')?.value.trim();
  const pass = document.getElementById('hm-pass')?.value || '0000';
  const loc = document.getElementById('hm-loc')?.value.trim();
  const errorBox = document.getElementById('host-modal-error');
  if (errorBox) errorBox.style.display = 'none';

  if (!name || !email || !loc) {
    if (errorBox) { errorBox.textContent = 'Please fill out all required fields.'; errorBox.style.display = 'block'; }
    return;
  }

  const host = {
    id: 'H-' + Math.floor(1000 + Math.random() * 9000),
    name: name,
    owner: owner || name,
    email: email,
    password: pass,
    location: loc,
    status: 'active',
    verified: true,
    commission: 3
  };
  setStoredHost(host);
  showToast(`Account registered! Opening Business Hub for ${name}... 🌿`, 'success');
  setTimeout(() => { window.location.href = 'business.html'; }, 800);
}

function submitHostModalLogin(e) {
  e.preventDefault();
  const input = document.getElementById('hm-login-email')?.value.trim();
  const pass = document.getElementById('hm-login-pass')?.value || '0000';
  const errorBox = document.getElementById('host-modal-error');
  if (errorBox) errorBox.style.display = 'none';

  if (!input || !pass) {
    if (errorBox) { errorBox.textContent = 'Please enter your host name or email and password.'; errorBox.style.display = 'block'; }
    return;
  }

  const DEFAULT_SEED_HOSTS = [
    { id: 'H-002', name: 'Suresh Rajapaksa', owner: 'Suresh Rajapaksa', role: 'Master Gem Cutter', email: 'suresh@ceylonxperiences.lk', password: '0000', location: 'Ratnapura, Sabaragamuwa Province', status: 'active', verified: true, commission: 3 },
    { id: 'H-001', name: 'Priya Jayawardena', owner: 'Priya Jayawardena', role: 'Master Home Cook', email: 'priya@ceylonxperiences.lk', password: '0000', location: 'Colombo Fort, Western Province', status: 'active', verified: true, commission: 3 },
    { id: 'H-003', name: 'Nimal Wickrama', owner: 'Nimal Wickrama', role: 'Pottery Master', email: 'nimal@ceylonxperiences.lk', password: '0000', location: 'Kelaniya, Western Province', status: 'active', verified: true, commission: 3 },
    { id: 'H-004', name: 'Chamari Peiris', owner: 'Chamari Peiris', role: 'Estate Tea Master', email: 'chamari@ceylonxperiences.lk', password: '0000', location: 'Nuwara Eliya, Central Province', status: 'active', verified: true, commission: 3 },
    { id: 'H-005', name: 'Amara de Silva', owner: 'Amara de Silva', role: 'Batik & Textile Artist', email: 'amara@ceylonxperiences.lk', password: '0000', location: 'Galle Fort, Southern Province', status: 'active', verified: true, commission: 3 },
    { id: 'H-006', name: 'Meena Arulpragasam', owner: 'Meena Arulpragasam', role: 'Culinary Historian', email: 'meena@ceylonxperiences.lk', password: '0000', location: 'Jaffna Peninsula, Northern Province', status: 'active', verified: true, commission: 3 }
  ];

  let hosts = [];
  try {
    const raw = localStorage.getItem('cxp_hosts');
    hosts = raw ? JSON.parse(raw) : [];
  } catch (err) {}

  if (!hosts || !hosts.length) {
    hosts = DEFAULT_SEED_HOSTS;
    localStorage.setItem('cxp_hosts', JSON.stringify(hosts));
  }

  let host = DEFAULT_SEED_HOSTS.find(h => 
    h.name.toLowerCase() === input.toLowerCase() ||
    (h.email && h.email.toLowerCase() === input.toLowerCase()) ||
    input.toLowerCase().includes(h.name.toLowerCase()) ||
    h.name.toLowerCase().includes(input.toLowerCase())
  ) || hosts.find(h => 
    h.name.toLowerCase() === input.toLowerCase() ||
    (h.email && h.email.toLowerCase() === input.toLowerCase()) ||
    input.toLowerCase().includes(h.name.toLowerCase()) ||
    h.name.toLowerCase().includes(input.toLowerCase())
  );

  if (!host) {
    if (pass === '0000') {
      const isEmail = input.includes('@');
      const cleanName = isEmail 
        ? input.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Studio'
        : input;
      const cleanEmail = isEmail ? input : (input.toLowerCase().replace(/[^a-z0-9]/g, '') + '@ceylonxperiences.lk');
      host = {
        id: 'H-' + Math.floor(1000 + Math.random() * 9000),
        name: cleanName,
        owner: cleanName,
        email: cleanEmail,
        password: pass,
        location: 'Sri Lanka',
        status: 'active',
        verified: true,
        commission: 3
      };
      hosts.push(host);
      localStorage.setItem('cxp_hosts', JSON.stringify(hosts));
    } else {
      if (errorBox) { errorBox.textContent = 'Invalid credentials. Use password 0000.'; errorBox.style.display = 'block'; }
      return;
    }
  } else if (host.password && host.password !== pass && pass !== '0000') {
    if (errorBox) { errorBox.textContent = 'Password does not match. Default is 0000.'; errorBox.style.display = 'block'; }
    return;
  }

  setStoredHost(host);
  showToast(`Signed in as ${host.name}! Opening Seller Hub...`, 'success');
  setTimeout(() => { window.location.href = 'business.html'; }, 800);
}

function hostModalLogout() {
  removeStoredHost();
  try { localStorage.removeItem('cxp_current_host'); } catch (e) {}
  showToast('Signed out of partner profile. You can now select or enter any host account.', 'info');
  const loggedInBox = document.getElementById('host-modal-logged-in');
  const authTabsWrap = document.getElementById('host-modal-auth-tabs-wrap');
  if (loggedInBox) {
    loggedInBox.style.display = 'none';
    loggedInBox.classList.add('hidden');
  }
  if (authTabsWrap) {
    authTabsWrap.style.display = 'block';
    authTabsWrap.classList.remove('hidden');
  }
  switchHostModalTab('login');
}

// ============================================================
// REVIEWS
// ============================================================
function renderReviewsBlock() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;
  container.innerHTML = mockReviews.map(r => `<div class="testimonial"><div class="testi-stars">${r.stars}</div><div class="testi-text">${r.text}</div><div class="testi-author"><div class="testi-avatar">${r.name.charAt(0)}</div><div><div class="testi-name">${r.name}</div><div class="testi-origin">${r.origin}</div></div></div></div>`).join('');
}

function submitReview() {
  const nameEl = document.getElementById('rev-name');
  const originEl = document.getElementById('rev-origin');
  const textEl = document.getElementById('rev-text');
  const stars = document.getElementById('rev-stars').value;
  if (!nameEl.value || !textEl.value) { showToast('Please fill in your name and review text.', 'error'); return; }
  const starsStr = '★'.repeat(Number(stars)) + '☆'.repeat(5 - Number(stars));
  mockReviews.unshift({stars:starsStr, text:`"${textEl.value}"`, name:nameEl.value, origin:originEl.value || 'Verified Guest'});
  nameEl.value = ''; originEl.value = ''; textEl.value = '';
  renderReviewsBlock();
  showToast('Your review has been posted! Thank you. ✨', 'success');
}

// ============================================================
// DATE INIT
// ============================================================
function initDynamicCheckoutDates() {
  const dateInput = document.getElementById('chk-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

// ============================================================
// LOAD ADMIN-APPROVED EXTRAS FROM LOCALSTORAGE
// (Businesses approved via admin.html appear automatically here)
// ============================================================
function loadApprovedExtras() {
  try {
    const extras = JSON.parse(localStorage.getItem('cxp_approved_extras') || '[]');
    if (!extras.length) return;
    const nextId = Math.max(...experiences.map(e => e.id)) + 1;
    extras.forEach((ex, i) => {
      // Avoid duplicates on hot-reload
      const alreadyAdded = experiences.some(e => e.id === ex.id);
      if (alreadyAdded) return;
      experiences.push({
        id: ex.id || nextId + i,
        cat: ex.cat || 'craft',
        title: ex.title || 'New Experience',
        location: ex.location || 'Sri Lanka',
        loc: (ex.location || 'sri lanka').toLowerCase(),
        numericPrice: Number(ex.price || ex.numericPrice || 5000),
        duration: ex.duration || '3 hours',
        size: ex.size || '2–8 guests',
        skill: ex.skill || 'Beginner',
        lang: 'English',
        rating: 'New',
        reviews: 0,
        imgUrl: ex.imgUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        gallery: ex.gallery || [ex.imgUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'],
        badge: '✦ New',
        badgeType: 'new',
        desc: ex.desc || ex.description || '',
        includes: ex.includes || ['All materials provided', 'Certificate of participation'],
        slots: ex.slots || { '09:00 AM': 5, '02:30 PM': 5, '05:00 PM': 5 },
        artisanId: null,
        artisanName: ex.artisanName || ex.name || 'New Partner',
        artisanBio: ex.artisanBio || ex.bio || '',
      });
    });
  } catch (e) {
    console.warn('Could not load approved extras:', e);
  }
}

// ============================================================
// DOMContentLoaded — INITIALIZER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  loadApprovedExtras();   // Merge admin-approved new businesses first
  initWishlist();
  updateWishlistNavCount();
  initDynamicCheckoutDates();
  initLiveExchangeRates();
  renderCards();
  renderReviewsBlock();
  initStatsCounter();
  initBackToTop();
  // Static hero keeps scrolling calm and avoids unnecessary work.
});
// Keyboard access for retained prototype controls; cards use native buttons.
document.addEventListener('keydown', event => {
  const target = event.target;
  if ((event.key === 'Enter' || event.key === ' ') && target.matches('[role="button"]:not(button)')) {event.preventDefault(); target.click();}
  if (event.key === 'Escape') {document.getElementById('modal').classList.remove('open'); closeMobileNavMenu();}
});

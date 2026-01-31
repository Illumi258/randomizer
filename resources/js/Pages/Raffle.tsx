import '../../css/raffle.css';
import { useState, useEffect, useRef } from 'react';
import { showItems } from '@/Items/api/getItems';
import { showParticipants } from '@/Participants/api/getParticipants';
import useDynamicQuery from '@/hooks/useDynamicQuery';

interface Winner {
  name: string;
  item: string;
}

// Icon mapping - directly use the stored icon values
const getIconClass = (iconValue: string) => {
  if (!iconValue) return 'bx-gift'; // default icon
  return iconValue.startsWith('bx') ? iconValue : `bx-${iconValue}`;
};

export default function Raffle() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [activeSection, setActiveSection] = useState<string | number>('home');
  const [raffleRunning, setRaffleRunning] = useState<{ [key: number]: boolean }>({});
  const [currentWinner, setCurrentWinner] = useState<{ [key: number]: string }>({});
  const [remainingItems, setRemainingItems] = useState<{ [key: number]: number }>({});
  const [allWinners, setAllWinners] = useState<Winner[]>([]);
  const [availableParticipants, setAvailableParticipants] = useState<string[]>([]);
  
  const raffleIntervals = useRef<{ [key: number]: any }>({});
  const rouletteSound = useRef<HTMLAudioElement | null>(null);
  const winnerSound = useRef<HTMLAudioElement | null>(null);

  // Fetch data using your custom hooks with shorter stale time for real-time updates
  const {
    data: items = [],
    isPending: isLoadingItems,
    isError: isErrorItems,
  } = useDynamicQuery(['FetchItems'], showItems, { 
    refetchInterval: 5000, // Override default 5s with 3s if needed
  });

  const {
    data: participants = [],
    isPending: isLoadingParticipants,
    isError: isErrorParticipants,
  } = useDynamicQuery(['FetchParticipants'], showParticipants, { 
    enabled:false
  });

  // Set up data when items and participants are loaded
  useEffect(() => {
    if (items.length > 0) {
      // Set up remaining items from database
      const remainingItemsMap: { [key: number]: number } = {};
      items.forEach(item => {
        remainingItemsMap[item.id] = item.remaining;
      });
      setRemainingItems(remainingItemsMap);
    }
  }, [items]);

  useEffect(() => {
    if (participants.length > 0) {
      // Set up available participants
      const participantNames = participants.map(p => `${p.fullname} - ${p.position}`);
      setAvailableParticipants(participantNames);
    }
  }, [participants]);

  // Initialize audio elements
  useEffect(() => {
    rouletteSound.current = new Audio('/sound/spin.mp3');
    winnerSound.current = new Audio('/sound/win.mp3');
    
    return () => {
      Object.values(raffleIntervals.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  const toggleSection = (section: number | string) => {
    setActiveSection(section);
  };

  const pickRandomWinner = (group: number) => {
    if (availableParticipants.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableParticipants.length);
      const winner = availableParticipants[randomIndex];
      setCurrentWinner(prev => ({ ...prev, [group]: winner }));
    }
  };

  const startRaffle = (group: number) => {
    console.log('Starting raffle for group:', group);
    if (!raffleIntervals.current[group] && availableParticipants.length > 0) {
      setRaffleRunning(prev => ({ ...prev, [group]: true }));
      raffleIntervals.current[group] = setInterval(() => {
        pickRandomWinner(group);
      }, 50);
      
      // Play roulette sound
      if (rouletteSound.current) {
        rouletteSound.current.loop = true;
        rouletteSound.current.play().catch(err => console.log('Audio play failed:', err));
      }
      
      console.log('Raffle started for group:', group);
    }
  };

  const stopRaffle = (group: number, itemName: string) => {
    console.log('Stopping raffle for group:', group);
    if (raffleIntervals.current[group]) {
      clearInterval(raffleIntervals.current[group]);
      raffleIntervals.current[group] = null;
      setRaffleRunning(prev => ({ ...prev, [group]: false }));

      // Stop roulette sound
      if (rouletteSound.current) {
        rouletteSound.current.pause();
        rouletteSound.current.currentTime = 0;
      }

      // Play winner sound
      if (winnerSound.current) {
        winnerSound.current.play().catch(err => console.log('Audio play failed:', err));
      }

      const winnerName = currentWinner[group];
      if (winnerName) {
        setAllWinners(prev => [...prev, { name: winnerName, item: itemName }]);
        setAvailableParticipants(prev => prev.filter(p => p !== winnerName));
        setRemainingItems(prev => ({
          ...prev,
          [group]: Math.max(0, (prev[group] || 0) - 1)
        }));
        console.log('Winner selected:', winnerName);
      }
    }
  };

  const toggleRaffle = (group: number, itemName: string) => {
    console.log('Toggle raffle clicked for group:', group, 'Running:', raffleRunning[group]);
    if (raffleRunning[group]) {
      stopRaffle(group, itemName);
    } else {
      startRaffle(group);
    }
  };

  // Show loading state
  if (isLoadingItems || isLoadingParticipants) {
    return (
      <>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
        <div className={`sidebar ${sidebarClosed ? 'close' : ''}`}>
          <div className="logo-details">
            <i className='bx bx-menu' onClick={toggleSidebar}></i>
            <span className="logo_name">ALFC Insurance</span>
          </div>
        </div>
        <section className="home-section">
          <div className="logo-center">
            <img src="/image/alfclogo.png" width="250" height="100" alt="ALFC Logo" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Loading...</h2>
          </div>
        </section>
      </>
    );
  }

  // Show error state
  if (isErrorItems || isErrorParticipants) {
    return (
      <>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
        <div className={`sidebar ${sidebarClosed ? 'close' : ''}`}>
          <div className="logo-details">
            <i className='bx bx-menu' onClick={toggleSidebar}></i>
            <span className="logo_name">ALFC Insurance</span>
          </div>
        </div>
        <section className="home-section">
          <div className="logo-center">
            <img src="/image/alfclogo.png" width="250" height="100" alt="ALFC Logo" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Error loading data. Please try again.</h2>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
      
      <div className={`sidebar ${sidebarClosed ? 'close' : ''}`}>
        <div className="logo-details">
          <i className='bx bx-menu' onClick={toggleSidebar}></i>
          <span className="logo_name">ALFC Insurance</span>
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => toggleSection('home')}>
              <i className='bx bxs-home'></i>
              <span className="link_name">Home</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="">Home</a></li>
            </ul>
          </li>

          {items.map((item) => (
            <li key={item.id}>
              <a onClick={() => toggleSection(item.id)} style={{height: '50px'}}>
                <i className={`bx ${getIconClass(item.icon || '')}`}></i>
                <span className="link_name">{item.item}</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name">{item.item}</a></li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <section className="home-section">
        <div className="logo-center">
          <img src="/image/alfclogo.png" width="250" height="100" alt="ALFC Logo" />
        </div>

        {activeSection === 'home' && (
          <div className="group" data-group="1" style={{marginTop: '10px'}}>
            <div className="group-content">
              <center>
                <h1 style={{color: '#000', fontSize: '48px', marginBottom: '20px'}}>Welcome to ALFC Raffle System</h1>
                <p style={{color: '#000', fontSize: '20px'}}>Available Participants: {availableParticipants.length}</p>
              </center>
            </div>
            
            {/* All Winners - only show on Home page */}
            {allWinners.length > 0 && (
              <div id="table-container" style={{marginTop: '50px'}}>
                <h2>All Winners</h2>
                <ul id="allWinners">
                  {allWinners.map((winner, index) => (
                    <li key={index} className="winner">
                      Winner {index + 1}: {winner.name} - Item: {winner.item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {items.map((item) => (
          activeSection === item.id && (
            <div key={item.id} className="raffle-content">
              <div className="raffle-left">
                <img 
                  src={item.image ? `/storage/${item.image}` : "/image/default-item.png"} 
                  alt={item.item} 
                  className="raffle-item-image" 
                />
              </div>
              <div className="raffle-right">
                <div className="remaining-badge">
                  Remaining items: {remainingItems[item.id] || 0}
                </div>
                
                <h1 className="item-title">{item.item}</h1>
                
                <button 
                  className="button4" 
                  onClick={() => toggleRaffle(item.id, item.item)}
                  disabled={remainingItems[item.id] <= 0}
                >
                  {raffleRunning[item.id] ? 'Stop' : 'Start'}
                </button>
                
                <div className="winner-box">
                  {currentWinner[item.id] || 'And the Winner is..'}
                </div>
              </div>
            </div>
          )
        ))}

      </section>
    </>
  );
}
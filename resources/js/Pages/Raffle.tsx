import '../../css/raffle.css';
import { useState, useEffect, useRef } from 'react';

interface Winner {
  name: string;
  item: string;
}

// Mock data - participants
const MOCK_PARTICIPANTS = [
  'BALUYUT, NICOLEEN - GENERAL MANAGER',
  'BUGUINA, CIPRIANO JR. - CHIEF FINANCE OFFICER',
  'CALIWAG, CRYSTEL - OPERATIONS MANAGER',
  'DE JESUS, CATHERINE ANGELA - SALES DIRECTOR',
  'ACOVERA, MICAS - SALES ASSOCIATE',
  'ALIMORONG, HAZEL - COLLECTION HEAD',
  'ALIPIO, ANGEL VAN - AREA MANAGER',
  'ALMEDINA, MARK ANTHONY - SALES ASSOCIATE',
  'ANDILAB, MADINE JOY - ACCOUNTS ANALYST',
  'ANIBAN, CHRISTINE - SALES ASSOCIATE',
  'APAREJADO JR, ALEXANDER - REGIONAL MANAGER',
  'AQUINO, HERBE - AREA MANAGER',
  'ARISGADO, ALDEN - REVENUE ANALYST',
  'AURINTO, VICKSON - MESSENGER',
  'BALAGAT, HERSHIE MAE - SALES ASSOCIATE',
  'BANAAG, ANGELA - COLLECTION ANALYST',
  'BARRIOS, JONATHAN CHARLES - DATABASE ASSOCIATE',
  'BATALLER, AUNDREY - SALES ASSOCIATE',
  'BAUTISTA, BENEDICT - REGIONAL MANAGER',
  'BITONIO, WINCHESTER - ACCOUNTS ANALYST',
];

export default function Raffle() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [raffleRunning, setRaffleRunning] = useState<{ [key: number]: boolean }>({});
  const [currentWinner, setCurrentWinner] = useState<{ [key: number]: string }>({});
  const [remainingItems, setRemainingItems] = useState<{ [key: number]: number }>({
    40: 10,
    41: 10,
    42: 10,
    43: 10,
    44: 2,
  });
  const [allWinners, setAllWinners] = useState<Winner[]>([]);
  const [availableParticipants, setAvailableParticipants] = useState<string[]>([...MOCK_PARTICIPANTS]);
  
  const raffleIntervals = useRef<{ [key: number]: any }>({});
  const rouletteSound = useRef<HTMLAudioElement | null>(null);
  const winnerSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
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

  const toggleSection = (section: number) => {
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

  useEffect(() => {
    // Initialize audio elements
    rouletteSound.current = new Audio('/sound/spin.mp3');
    winnerSound.current = new Audio('/sound/win.mp3');
    
    return () => {
      Object.values(raffleIntervals.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

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
            <a onClick={() => toggleSection(1)}>
              <i className='bx bxs-home'></i>
              <span className="link_name">Home</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="">Home</a></li>
            </ul>
          </li>

          <li>
            <a onClick={() => toggleSection(40)} style={{height: '50px'}}>
              <i className='bx bx-headphone'></i>
              <span className="link_name">Wireless Earbuds</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name">Wireless Earbuds</a></li>
            </ul>
          </li>

          <li>
            <a onClick={() => toggleSection(41)} style={{height: '50px'}}>
              <i className='bx bxs-battery-charging'></i>
              <span className="link_name">Power Bank</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name">Power Bank</a></li>
            </ul>
          </li>

          <li>
            <a onClick={() => toggleSection(42)} style={{height: '50px'}}>
              <i className='bx bx-volume-full'></i>
              <span className="link_name">Blaupunkt BT Speaker</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name">Blaupunkt BT Speaker</a></li>
            </ul>
          </li>

          <li>
            <a onClick={() => toggleSection(43)} style={{height: '50px'}}>
              <i className='bx bx-wind'></i>
              <span className="link_name">Jaguar Handheld Fan</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name">Jaguar Handheld Fan</a></li>
            </ul>
          </li>

          <li>
            <a onClick={() => toggleSection(44)} style={{height: '50px'}}>
              <i className='bx bx-timer'></i>
              <span className="link_name">Air Fryer</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name">Air Fryer</a></li>
            </ul>
          </li>
        </ul>
      </div>

      <section className="home-section">
        <div className="logo-center">
          <img src="/image/alfclogo.png" width="250" height="100" alt="ALFC Logo" />
        </div>

        {activeSection === 1 && (
          <div className="group" data-group="1" style={{marginTop: '10px'}}>
            <div className="group-content">
              <center>
                <h1 style={{color: '#000', fontSize: '48px', marginBottom: '20px'}}>Welcome to ALFC Raffle System</h1>
                <p style={{color: '#000', fontSize: '20px'}}>Available Participants: {availableParticipants.length}</p>
              </center>
            </div>
          </div>
        )}

        {activeSection === 40 && (
          <div className="raffle-content">
            <div className="raffle-left">
              <img src="/image/alfcraffle1.png" alt="Wireless Earbuds" className="raffle-item-image" />
            </div>
            <div className="raffle-right">
              <div className="remaining-badge">
                Remaining items: {remainingItems[40]}
              </div>
              
              <h1 className="item-title">Proton Flex F1 True Wireless Earbuds</h1>
              
              <button 
                className="button4" 
                onClick={() => toggleRaffle(40, 'Proton Flex F1 True Wireless Earbuds')}
              >
                {raffleRunning[40] ? 'Stop' : 'Start'}
              </button>
              
              <div className="winner-box">
                {currentWinner[40] || 'And the Winner is..'}
              </div>
            </div>
          </div>
        )}

        {activeSection === 41 && (
          <div className="raffle-content">
            <div className="raffle-left">
              <img src="/image/alfcraffle2.png" alt="Power Bank" className="raffle-item-image" />
            </div>
            <div className="raffle-right">
              <div className="remaining-badge">
                Remaining items: {remainingItems[41]}
              </div>
              
              <h1 className="item-title">Jaguar Electronics PB157 5000mAh Power Bank</h1>
              
              <button 
                className="button4" 
                onClick={() => toggleRaffle(41, 'Jaguar Electronics PB157 5000mAh Power Bank')}
              >
                {raffleRunning[41] ? 'Stop' : 'Start'}
              </button>
              
              <div className="winner-box">
                {currentWinner[41] || 'And the Winner is..'}
              </div>
            </div>
          </div>
        )}

        {activeSection === 42 && (
          <div className="raffle-content">
            <div className="raffle-left">
              <img src="/image/alfcraffle3.png" alt="BT Speaker" className="raffle-item-image" />
            </div>
            <div className="raffle-right">
              <div className="remaining-badge">
                Remaining items: {remainingItems[42]}
              </div>
              
              <h1 className="item-title">Blaupunkt BT Speaker with Active Subwoofer</h1>
              
              <button 
                className="button4" 
                onClick={() => toggleRaffle(42, 'Blaupunkt BT Speaker with Active Subwoofer')}
              >
                {raffleRunning[42] ? 'Stop' : 'Start'}
              </button>
              
              <div className="winner-box">
                {currentWinner[42] || 'And the Winner is..'}
              </div>
            </div>
          </div>
        )}

        {activeSection === 43 && (
          <div className="raffle-content">
            <div className="raffle-left">
              <img src="/image/alfcraffle4.png" alt="Handheld Fan" className="raffle-item-image" />
            </div>
            <div className="raffle-right">
              <div className="remaining-badge">
                Remaining items: {remainingItems[43]}
              </div>
              
              <h1 className="item-title">Jaguar Electronics PF02 Portable Handheld Fan</h1>
              
              <button 
                className="button4" 
                onClick={() => toggleRaffle(43, 'Jaguar Electronics PF02 Portable Handheld Fan')}
              >
                {raffleRunning[43] ? 'Stop' : 'Start'}
              </button>
              
              <div className="winner-box">
                {currentWinner[43] || 'And the Winner is..'}
              </div>
            </div>
          </div>
        )}

        {activeSection === 44 && (
          <div className="raffle-content">
            <div className="raffle-left">
              <img src="/image/alfcraffle5.png" alt="Air Fryer" className="raffle-item-image" />
            </div>
            <div className="raffle-right">
              <div className="remaining-badge">
                Remaining items: {remainingItems[44]}
              </div>
              
              <h1 className="item-title">Kazumi KZ50 6.5L Air Fryer</h1>
              
              <button 
                className="button4" 
                onClick={() => toggleRaffle(44, 'Kazumi KZ50 6.5L Air Fryer')}
              >
                {raffleRunning[44] ? 'Stop' : 'Start'}
              </button>
              
              <div className="winner-box">
                {currentWinner[44] || 'And the Winner is..'}
              </div>
            </div>
          </div>
        )}

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
      </section>
    </>
  );
}

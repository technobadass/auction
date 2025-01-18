import React, { useState } from 'react';
import { User, AuctionDetails, Player } from './types';
import { predefinedUsers } from './data/users';
import { LogIn } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'auth' | 'auctionForm' | 'success' | 'auction'>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [auctionDetails, setAuctionDetails] = useState<AuctionDetails>({
    auctionName: '',
    logo: '',
    teams: [''],
    points: 0,
    startDate: '',
    endDate: '',
  });
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', points: 100, team: 'Team A', isSold: false },
    { id: 2, name: 'Player 2', points: 150, team: 'Team B', isSold: false },
    { id: 3, name: 'Player 3', points: 200, team: 'Team C', isSold: false },
  ]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = predefinedUsers.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        setCurrentPage('auctionForm');
        setError('');
      } else {
        setError('Invalid credentials');
      }
    } else {
      const userExists = predefinedUsers.some((u) => u.username === username);
      if (userExists) {
        setError('Username already exists');
      } else {
        predefinedUsers.push({ username, password });
        setCurrentPage('auctionForm');
        setError('');
      }
    }
  };

  const handleAuctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('success');
  };

  const handleBuyPlayer = (playerId: number) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, isSold: true } : player
    ));
  };

  const renderAuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <LogIn className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">
          {isLogin ? 'Login to Auctionior' : 'Sign Up for Auctionior'}
        </h1>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );

  const renderAuctionForm = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Create New Auction</h2>
        <form onSubmit={handleAuctionSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Auction Name</label>
            <input
              type="text"
              value={auctionDetails.auctionName}
              onChange={(e) => setAuctionDetails({...auctionDetails, auctionName: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input
              type="url"
              value={auctionDetails.logo}
              onChange={(e) => setAuctionDetails({...auctionDetails, logo: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              value={auctionDetails.points}
              onChange={(e) => setAuctionDetails({...auctionDetails, points: Number(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={auctionDetails.startDate}
                onChange={(e) => setAuctionDetails({...auctionDetails, startDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={auctionDetails.endDate}
                onChange={(e) => setAuctionDetails({...auctionDetails, endDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
          >
            Submit Auction Details
          </button>
        </form>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-4 text-green-500">
          <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Auction Details Stored Successfully!</h2>
        <p className="text-gray-600 mb-8">Your auction has been created and is ready to begin.</p>
        <button
          onClick={() => setCurrentPage('auction')}
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        >
          Start Auction
        </button>
      </div>
    </div>
  );

  const renderAuction = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">{auctionDetails.auctionName}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{player.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!player.isSold ? (
                      <button
                        onClick={() => handleBuyPlayer(player.id)}
                        className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition-colors"
                      >
                        Buy
                      </button>
                    ) : (
                      <span className="text-gray-500">Sold</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentPage === 'auth' && renderAuthPage()}
      {currentPage === 'auctionForm' && renderAuctionForm()}
      {currentPage === 'success' && renderSuccess()}
      {currentPage === 'auction' && renderAuction()}
    </div>
  );
}

export default App;
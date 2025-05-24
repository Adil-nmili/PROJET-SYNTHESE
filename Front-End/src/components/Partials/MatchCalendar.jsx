import React from 'react';

const MatchCalendar = ({ calendar }) => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Calendrier des Matchs</h2>
      <div className="max-w-4xl mx-auto">
        {calendar.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-xl p-6 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={match.image}
                  alt={match.opponent}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Lakers vs {match.opponent}</h3>
                  <p className="text-gray-600">
                    {new Date(match.date).toLocaleDateString()} à {match.time}
                  </p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full ${
                match.venue === 'Home' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {match.venue === 'Home' ? 'Domicile' : 'Extérieur'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchCalendar; 
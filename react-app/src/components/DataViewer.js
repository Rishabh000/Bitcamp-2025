import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DataViewer = () => {
    const [students, setStudents] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('students');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await api.checkAuth();
                setIsAuthenticated(response.authenticated);
                if (!response.authenticated) {
                    navigate('/login');
                }
            } catch (err) {
                navigate('/login');
            }
        };

        checkAuthentication();
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated) return;

            try {
                setLoading(true);
                const [matchesData] = await Promise.all([
                    api.getMatches()
                ]);
                setMatches(matchesData);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div className="loading">Redirecting to login...</div>;
    }

    if (loading) return <div className="loading">Loading data...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-viewer">
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
                    onClick={() => setActiveTab('matches')}
                >
                    Matches
                </button>
            </div>

            {activeTab === 'matches' && (
                <div className="matches-list">
                    <h2>Matches</h2>
                    {matches.length === 0 ? (
                        <p>No matches found</p>
                    ) : (
                        matches.map(match => (
                            <div key={match.id} className="card">
                                <h3>{match.student_name} - {match.professor_name}</h3>
                                <p>Score: {match.score}</p>
                                <p>Reasons: {match.reasons.join(', ')}</p>
                                <p>Role: {match.role}</p>
                                <p>Interest: {match.interest}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            <style jsx>{`
                .data-viewer {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .tab {
                    padding: 10px 20px;
                    border: none;
                    background: #f0f0f0;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .tab.active {
                    background: #007bff;
                    color: white;
                }
                .card {
                    background: white;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .loading, .error {
                    text-align: center;
                    padding: 20px;
                    font-size: 18px;
                }
                .error {
                    color: red;
                }
            `}</style>
        </div>
    );
};

export default DataViewer; 
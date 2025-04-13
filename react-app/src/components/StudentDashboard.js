import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [profileData, matchesData] = await Promise.all([
                    api.getStudentProfile(),
                    api.getMatches()
                ]);
                setProfile(profileData);
                setMatches(matchesData);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await api.logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="student-dashboard">
            <div className="header">
                <h1>Student Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            {profile && (
                <div className="profile-section">
                    <h2>Your Profile</h2>
                    <div className="card">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Major:</strong> {profile.major}</p>
                        <p><strong>Education Level:</strong> {profile.education_level}</p>
                        <p><strong>Desired Role:</strong> {profile.desired_role}</p>
                        <p><strong>Research Interests:</strong> {profile.research_interests.join(', ')}</p>
                        <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                    </div>
                </div>
            )}

            <div className="matches-section">
                <h2>Your Matches</h2>
                {matches.length === 0 ? (
                    <p>No matches found</p>
                ) : (
                    matches.map(match => (
                        <div key={match.id} className="card">
                            <h3>{match.professor_name}</h3>
                            <p><strong>Department:</strong> {match.department}</p>
                            <p><strong>Research Interests:</strong> {match.research_interests.join(', ')}</p>
                            <p><strong>Match Score:</strong> {match.score}</p>
                            <p><strong>Reasons:</strong> {match.reasons.join(', ')}</p>
                            <p><strong>Role:</strong> {match.role}</p>
                            <p><strong>Interest:</strong> {match.interest}</p>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .student-dashboard {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .logout-button {
                    padding: 8px 16px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
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

export default StudentDashboard; 
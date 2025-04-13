// components/professor/ProfessorPortal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import ProfessorAuth from './ProfessorAuth';
import ProfessorProfile from './ProfessorProfile';
import ProfessorOpportunities from './ProfessorOpportunities';
import ProfessorPostOpportunity from './ProfessorPostOpportunity';
import ProfessorApplicants from './ProfessorApplicants';

const ProfessorPortal = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('profile');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [students, setStudents] = useState([]);
    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters] = useState({
        role: '',
        interest: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.getProfessorPortal();
                setStudents(response.students);
                setProfessor(response.professor);
                setIsLoggedIn(true);
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
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleAuthSuccess = () => {
        setIsLoggedIn(true);
        setCurrentTab('profile');
    };

    if (loading) return <div className="loading">Loading professor portal...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    if (!isLoggedIn) {
        return <ProfessorAuth onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="professor-portal">
            <div className="professor-info">
                <h2>Welcome, {professor?.name}</h2>
                <div className="tab-navigation">
                    <button 
                        className={`tab-button ${currentTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('profile')}
                    >
                        Profile
                    </button>
                    <button 
                        className={`tab-button ${currentTab === 'opportunities' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('opportunities')}
                    >
                        View Opportunities
                    </button>
                    <button 
                        className={`tab-button ${currentTab === 'post' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('post')}
                    >
                        Post Opportunity
                    </button>
                    <button 
                        className={`tab-button ${currentTab === 'applicants' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('applicants')}
                    >
                        View Applicants
                    </button>
                    <button className="tab-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="content-area">
                {currentTab === 'profile' && (
                    <ProfessorProfile professor={professor} />
                )}
                {currentTab === 'opportunities' && (
                    <ProfessorOpportunities professor={professor} />
                )}
                {currentTab === 'post' && (
                    <ProfessorPostOpportunity professor={professor} />
                )}
                {currentTab === 'applicants' && (
                    <ProfessorApplicants 
                        professor={professor}
                        students={students}
                        filters={filters}
                    />
                )}
            </div>

            <style jsx>{`
                .professor-portal {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .professor-info {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .tab-navigation {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                    border-bottom: 1px solid #dee2e6;
                    padding-bottom: 10px;
                }
                .tab-button {
                    padding: 8px 16px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    font-size: 16px;
                    color: #6c757d;
                    border-radius: 4px;
                }
                .tab-button:hover {
                    background: #e9ecef;
                    color: #495057;
                }
                .tab-button.active {
                    background: #007bff;
                    color: white;
                }
                .content-area {
                    margin-top: 20px;
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

export default ProfessorPortal;

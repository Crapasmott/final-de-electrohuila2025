'use client';

import React from 'react';

const PoliticasTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'institucionales', label: 'Institucionales', icon: '✓' },
        { id: 'comerciales', label: 'Comerciales', icon: '✓' },
        { id: 'administrativas', label: 'Administrativas y Financieras', icon: '✓' }
    ];
    
    return (
        <div className="tabs-container" style={{ marginBottom: '30px' }}>
            <div className="tabs" style={{
                display: 'flex',
                borderBottom: '1px solid #e0e0e0',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '15px 30px',
                            border: 'none',
                            backgroundColor: activeTab === tab.id ? '#0098d9' : '#ebeef1',
                            color: activeTab === tab.id ? 'white' : '#333',
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 5px'
                        }}
                    >
                        <span style={{ marginRight: '10px' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PoliticasTabs;
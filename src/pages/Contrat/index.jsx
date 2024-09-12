import React, { useState } from 'react';
import { contractData } from '../../constants/ContratData'; // Import contract data
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Use navigate for programmatic navigation

const Contrat = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleContractClick = (contractId) => {
    navigate(`/contract-details/${contractId}`); // Navigate to the contract details page
  };

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      // If clicking on the selected type, reset the selection
      setSelectedType(null);
    } else {
      // Otherwise, set the selected type
      setSelectedType(type);
    }
  };

  const renderContractTypes = () => (
    <div className="contract-types mb-4">
      <Button
        variant="outline-primary"
        className="contract-button mr-2"
        onClick={() => handleTypeClick('travail')}
      >
        Contrats de Travail
      </Button>
      <Button
        variant="outline-primary"
        className="contract-button mr-2"
        onClick={() => handleTypeClick('attestation')}
      >
        Attestations
      </Button>
    </div>
  );

  const renderContracts = () => {
    if (!selectedType) {
      return <p>Select a contract type to see details.</p>;
    }
    const contracts = contractData[selectedType];

    return (
      <Row className="contract-list">
        {contracts.map((contract) => (
          <Col md={4} key={contract.id} className="mb-4">
            <Card className={`contract-card ${selectedType === 'travail' ? 'contract-travail' : ''}`}>
              <Card.Body>
                <Card.Title>{contract.title}</Card.Title>
                <Card.Text>
                  Utilisation: {contract.usage} fois
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => handleContractClick(contract.id)} // Pass the contract ID to handleContractClick
                >
                  Voir le contrat
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <h2>Menu des Contrats</h2>
      {renderContractTypes()}
      {renderContracts()}
    </div>
  );
};

export default Contrat;

import React from 'react';
import { useParams } from 'react-router-dom';
import { contractDetails } from "../../constants/contractDetails";
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';

const ContractDetails = () => {
  const { id } = useParams();
  const contract = contractDetails[id];

  // Initialize states
  const [selectedLaw, setSelectedLaw] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState('Francais');
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    image: contract.image,
    title: contract.title,
    author: contract.author,
    usage: contract.usage,
    applicableLaw: '',
    newLaw: '', // For new law input
    description: contract.description,
    language: 'Francais',
    newLanguage: '' // For new language input
  });

  // If contract is not found, show a message
  if (!contract) {
    return <p>Contract not found.</p>;
  }

  // Handlers for form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLawChange = (e) => setFormData({ ...formData, applicableLaw: e.target.value });
  const handleLanguageChange = (e) => setFormData({ ...formData, language: e.target.value });

  // Modal handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSave = () => {
    // Add your save logic here
    console.log("Form Data:", formData);
    handleCloseModal();
  };

  return (
    <>
      <Card className="p-4 my-4">
        <div className="d-flex">
          <img
            src={contract.image}
            alt="Contract Preview"
            className="img-thumbnail mr-4" // Added margin-right
            style={{ width: '150px', height: 'auto' }}
          />
          <div>
            <h4 className="font-weight-bold">{contract.title}</h4>
            <p>
              Auteur: <strong>{contract.author}</strong> • Utilisé: <strong>{contract.usage}</strong> • {contract.duration}
            </p>
            <Form.Group controlId="applicableLaws" className="mb-3">
              <Form.Label>Lois applicables</Form.Label>
              <Form.Control
                as="select"
                value={formData.applicableLaw}
                onChange={handleLawChange}
              >
                <option value="">Choisissez ...</option>
                {contract.applicableLaws.map((law, index) => (
                  <option key={index} value={law}>
                    {law}
                  </option>
                ))}
                <option value="Autre">Autre (Please specify)</option>
              </Form.Control>
              {formData.applicableLaw === 'Autre' && (
                <Form.Control
                  type="text"
                  name="newLaw"
                  placeholder="Specify other law"
                  value={formData.newLaw}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              )}
            </Form.Group>
            <Form.Group controlId="languageSelect" className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                value={formData.language}
                onChange={handleLanguageChange}
              >
                <option value="Francais">Francais</option>
                <option value="English">English</option>
                <option value="Autre">Autre (Please specify)</option>
              </Form.Control>
              {formData.language === 'Autre' && (
                <Form.Control
                  type="text"
                  name="newLanguage"
                  placeholder="Specify other language"
                  value={formData.newLanguage}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              )}
            </Form.Group>
          </div>
        </div>
        <div className="mt-4">
          <h5>Description</h5>
          <p>{contract.description}</p>
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <FaPen className="mr-2" /> Modifier le modèle
        </Button>
      </Card>

      {/* Modal for editing contract details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le modèle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editAuthor">
              <Form.Label>Auteur</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editUsage">
              <Form.Label>Utilisé</Form.Label>
              <Form.Control
                type="text"
                name="usage"
                value={formData.usage}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editApplicableLaw">
              <Form.Label>Lois applicables</Form.Label>
              <Form.Control
                as="select"
                name="applicableLaw"
                value={formData.applicableLaw}
                onChange={handleLawChange}
              >
                <option value="">Choisissez ...</option>
                {contract.applicableLaws.map((law, index) => (
                  <option key={index} value={law}>
                    {law}
                  </option>
                ))}
                <option value="Autre">Autre (Please specify)</option>
              </Form.Control>
              {formData.applicableLaw === 'Autre' && (
                <Form.Control
                  type="text"
                  name="newLaw"
                  placeholder="Specify other law"
                  value={formData.newLaw}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              )}
            </Form.Group>
            <Form.Group controlId="editLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                name="language"
                value={formData.language}
                onChange={handleLanguageChange}
              >
                <option value="Francais">Francais</option>
                <option value="English">English</option>
                <option value="Autre">Autre (Please specify)</option>
              </Form.Control>
              {formData.language === 'Autre' && (
                <Form.Control
                  type="text"
                  name="newLanguage"
                  placeholder="Specify other language"
                  value={formData.newLanguage}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              )}
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContractDetails;

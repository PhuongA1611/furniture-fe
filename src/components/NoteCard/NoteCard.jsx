import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';

import './NoteCard.scss';

library.add(fas);

const NoteCard = (props) => {
  const { listNote } = props;
  return (
    <>
      {listNote && (
        <section className="element">
          <Container>
            <Row>
              {listNote.map((element, index) => (
                <Col lg={3} md={6}>
                  <div className="element__child" key={index}>
                    <div className="element__child__icon">
                      <FontAwesomeIcon icon={element.icon} size="3x" />
                    </div>
                    <h3>{element.content}</h3>
                    <p>{element.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default NoteCard;

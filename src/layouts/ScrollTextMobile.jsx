import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FadeMobile from "../components/FadeMobile";
import AnimatedCTA from "../components/AnimatedCTA";

export default function ScrollTextMobile() {
  return (
    <Container>
      {/* SCREEN 1 – phrase seule centrée */}
      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12}>
          <FadeMobile>
            <h1 className="scroll-text">Life isn't always easy</h1>
          </FadeMobile>
        </Col>
      </Row>

      {/* SCREEN 2 – deux blocs espacés */}
      <Row className="scroll-section text-center align-items-start justify-content-center">
        <Col
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30vh",
          }}
        >
          <FadeMobile>
            <h1 className="scroll-text force-white">Sometimes you can feel</h1>
          </FadeMobile>

          <FadeMobile>
            <h1 className="scroll-text">Lost</h1>
            <h1 className="scroll-text">Overwhelmed</h1>
            <h1 className="scroll-text">Empty inside</h1>
          </FadeMobile>
        </Col>
      </Row>

      {/* SCREEN 3 – deux blocs espacés */}
      <Row className="scroll-section text-center align-items-start justify-content-center">
        <Col
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30vh",
          }}
        >
          <FadeMobile>
            <h1 className="scroll-text">
              Do you know the <br /> Butterfly effect ?
            </h1>
          </FadeMobile>

          <FadeMobile>
            <h1 className="scroll-text">
              One little step can <br /> change everything
            </h1>
          </FadeMobile>
        </Col>
      </Row>

      {/* SCREEN 4 – phrase + bouton centrés */}
      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12}>
          <FadeMobile>
            <h1 className="scroll-text">
              It's time to get <br /> the support you need
            </h1>
          </FadeMobile>
          <AnimatedCTA />
        </Col>
      </Row>
    </Container>
  );
}

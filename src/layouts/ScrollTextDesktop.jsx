import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AnimatedCTA from "../components/AnimatedCTA";
import FadeText from "../components/FadeText";

export default function ScrollTextMobile() {
  return (
    <Container>
      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={6}>
          <div
            style={{
              animation: "fadeIn 1.5s ease-in forwards",
              opacity: 0,
            }}
          >
            <h1 className="scroll-text">Life isn't always easy</h1>
          </div>
        </Col>
      </Row>

      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={6}>
          <FadeText scrollRange={[0.15, 0.25]} noFade>
            <h1 className="scroll-text force-white">Sometimes you can feel</h1>
          </FadeText>
        </Col>
      </Row>

      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={6}>
          <FadeText scrollRange={[0.3, 0.4]}>
            <h1 className="scroll-text">Lost</h1>
            <h1 className="scroll-text">Overwhelmed</h1>
            <h1 className="scroll-text">Empty inside</h1>
          </FadeText>
        </Col>
      </Row>

      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={6}>
          <FadeText scrollRange={[0.48, 0.58]}>
            <h1 className="scroll-text">
              Do you know the <br /> Butterfly effect ?
            </h1>
          </FadeText>
        </Col>
      </Row>

      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={8}>
          <FadeText scrollRange={[0.65, 0.75]}>
            <h1 className="scroll-text">
              One little step can <br /> change everything
            </h1>
          </FadeText>
        </Col>
      </Row>

      <Row className="scroll-section text-center align-items-center justify-content-center">
        <Col xs={12} md={6}>
          <FadeText scrollRange={[0.82, 0.92]}>
            <h1 className="scroll-text">
              It's time to get <br /> the support you need
            </h1>
          </FadeText>
          <AnimatedCTA />
        </Col>
      </Row>
    </Container>
  );
}

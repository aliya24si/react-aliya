import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
                <HelloWorld/>
            </Container>
            {/* <HelloWorld/>
            <HelloWorld/> */}
        </div>
    )

    import './custom.css';
import * as React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./Header.scss";
import {customHistory, rootStore} from "../../../renderer";
import {observer} from "mobx-react";

@observer
export class Header extends React.Component {
    protected getLoggedInUserAvailableActions(): React.ReactNode {
        const loggedUser = rootStore.auth.loggedUser;
        return (
            <NavDropdown title={`${loggedUser?.firstName} ${loggedUser?.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        rootStore.auth.logout();
                        customHistory.push("/");
                    }}
                >
                    Wyloguj się
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    protected getLoggedOutUserAvailableActions(): React.ReactNode {
        return (
            <NavDropdown title="Konto" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        customHistory.push("/login");
                    }}
                >
                    Zaloguj się
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => {
                        customHistory.push("/register");
                    }}
                >
                    Zarejestruj się
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    public render() {
        return (
            <div className={"Header"}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand
                        onClick={() => {
                            customHistory.push("/");
                        }}
                    >
                        Gry
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {rootStore.auth.isLoggedIn
                                ? this.getLoggedInUserAvailableActions()
                                : this.getLoggedOutUserAvailableActions()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

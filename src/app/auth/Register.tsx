import * as React from "react";
import {Button, Col, Form} from "react-bootstrap";
import {IAuthRegisterUser} from "./IAuthRegisterUser";
import {AuthService} from "./AuthService";
import {RouteComponentProps, withRouter} from "react-router";

interface IProps extends RouteComponentProps {}

interface IState {
    authRegisterUser: IAuthRegisterUser;
}

export const Register = withRouter(
    class InnerRegister extends React.Component<IProps, IState> {
        constructor(props: IProps) {
            super(props);

            this.state = {
                authRegisterUser: {
                    firstName: "Jan",
                    lastName: "Kowalski",
                    email: "jan.kowalski@gmail.com",
                    password: "0okm(IJN",
                },
            };
        }

        protected setAuthRegisterUserProperty = (data: Partial<IAuthRegisterUser>) => {
            this.setState((state) => ({
                ...state,
                authRegisterUser: {
                    ...state.authRegisterUser,
                    ...data,
                },
            }));
        };

        protected register = async () => {
            await AuthService.registerUser(this.state.authRegisterUser);
            this.props.history.push("/login");
        };

        public render() {
            return (
                <div className={"Register"}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    value={this.state.authRegisterUser.firstName}
                                    onChange={(event) => {
                                        this.setAuthRegisterUserProperty({firstName: event.target.value});
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    value={this.state.authRegisterUser.lastName}
                                    onChange={(event) => {
                                        this.setAuthRegisterUserProperty({lastName: event.target.value});
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.authRegisterUser.email}
                                    onChange={(event) => {
                                        this.setAuthRegisterUserProperty({email: event.target.value});
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.authRegisterUser.password}
                                    onChange={(event) => {
                                        this.setAuthRegisterUserProperty({password: event.target.value});
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" onClick={this.register}>
                            Zarejestruj się
                        </Button>
                    </Form>
                </div>
            );
        }
    }
);

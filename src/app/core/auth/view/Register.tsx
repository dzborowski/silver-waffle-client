import * as React from "react";
import {Button, Col, Form} from "react-bootstrap";
import {IAuthRegisterUser} from "../interface/IAuthRegisterUser";
import {AuthService} from "../AuthService";
import {AppModel} from "../../../AppModel";
import "./Register.scss";
import {NotificationUtil} from "../../notifications/NotificationUtil";

interface IProps {}

interface IState {
    authRegisterUser: IAuthRegisterUser;
}

export class Register extends React.Component<IProps, IState> {
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
        AppModel.history.push("/login");
        NotificationUtil.success({message: "Sign up successfully!"});
    };

    public render() {
        return (
            <div className={"Register"}>
                <Form className={"register-form"}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                value={this.state.authRegisterUser.firstName}
                                onChange={(event) => {
                                    this.setAuthRegisterUserProperty({firstName: event.target.value});
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Lastname</Form.Label>
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

                    <Form.Row className={"register-cta"}>
                        <Button variant="primary" onClick={this.register}>
                            Sign up
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}
